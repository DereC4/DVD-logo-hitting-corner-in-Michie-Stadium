package main

import (
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"sort"
)

// hard coded lol
const url = "https://youtu.be/ytKVGtJ5yng?si=2bq3ltobiuo9lA4q"

func main() {
	cmd := exec.Command(
		"yt-dlp",
		"--skip-download",
		"--write-comments",
		"--dump-json",
		"--no-progress",
		"--no-warnings",
		url,
	)
	out, err := cmd.Output()
	if err != nil {
		if ee, ok := err.(*exec.ExitError); ok {
			fmt.Fprintf(os.Stderr, "yt-dlp failed:\n%s\n", ee.Stderr)
		}
		panic(err)
	}

	var info struct {
		Comments []map[string]any `json:"comments"`
	}
	if err := json.Unmarshal(out, &info); err != nil {
		panic(err)
	}

	comments := info.Comments
	if comments == nil {
		comments = []map[string]any{}
	}

	sort.SliceStable(comments, func(i, j int) bool {
		return likeCount(comments[i]) > likeCount(comments[j])
	})

	data, err := json.MarshalIndent(comments, "", "  ")
	if err != nil {
		panic(err)
	}
	data = append(data, '\n')

	outPath := filepath.Join("docs", "comments.json")
	if err := os.WriteFile(outPath, data, 0644); err != nil {
		panic(err)
	}

	fmt.Printf("Done\nExtracted %d comments from el video\n", len(comments))
}

func likeCount(comment map[string]any) float64 {
	n, _ := comment["like_count"].(float64)
	return n
}
