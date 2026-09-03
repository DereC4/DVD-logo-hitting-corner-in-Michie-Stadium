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
	outPath := filepath.Join("docs", "comments.json")
	existing := loadComments(outPath)

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

	fetched := info.Comments
	if fetched == nil {
		fetched = []map[string]any{}
	}

	comments := mergeComments(existing, fetched)

	sort.SliceStable(comments, func(i, j int) bool {
		return likeCount(comments[i]) > likeCount(comments[j])
	})

	data, err := json.MarshalIndent(comments, "", "  ")
	if err != nil {
		panic(err)
	}
	data = append(data, '\n')

	if err := os.WriteFile(outPath, data, 0644); err != nil {
		panic(err)
	}

	fmt.Printf("Done\nExtracted %d comments from el video\nArchived %d total\n", len(fetched), len(comments))
}

func loadComments(path string) []map[string]any {
	raw, err := os.ReadFile(path)
	if err != nil {
		if os.IsNotExist(err) {
			return []map[string]any{}
		}
		panic(err)
	}

	var comments []map[string]any
	if err := json.Unmarshal(raw, &comments); err != nil {
		panic(err)
	}
	if comments == nil {
		return []map[string]any{}
	}
	return comments
}

func mergeComments(existing, fetched []map[string]any) []map[string]any {
	merged := make([]map[string]any, len(existing))
	copy(merged, existing)

	byID := make(map[string]int, len(merged))
	for i, comment := range merged {
		if id := commentID(comment); id != "" {
			byID[id] = i
		}
	}

	for _, comment := range fetched {
		id := commentID(comment)
		if i, ok := byID[id]; ok && id != "" {
			merged[i] = comment
			continue
		}
		merged = append(merged, comment)
		if id != "" {
			byID[id] = len(merged) - 1
		}
	}

	return merged
}

func commentID(comment map[string]any) string {
	id, _ := comment["id"].(string)
	return id
}

func likeCount(comment map[string]any) float64 {
	n, _ := comment["like_count"].(float64)
	return n
}
