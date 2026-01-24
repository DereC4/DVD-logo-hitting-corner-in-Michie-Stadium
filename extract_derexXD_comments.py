import subprocess

# hard coded lol

url = 'https://youtu.be/ytKVGtJ5yng?si=2bq3ltobiuo9lA4q'
subprocess.run(
    [
        "yt-dlp",
        "--skip-download",
        "--write-comments",
        "--no-write-info-json",
        "--output",
        "comments",
        url,
    ],
    check=True
)
