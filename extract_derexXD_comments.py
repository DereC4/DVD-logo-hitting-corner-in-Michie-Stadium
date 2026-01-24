import subprocess
import json
from yt_dlp import YoutubeDL

flags = {
    "skip_download": True,
    "writesubtitles": False,
    "writeautomaticsub": False,
    "getcomments": True,  
    }

# hard coded lol

url = 'https://youtu.be/ytKVGtJ5yng?si=2bq3ltobiuo9lA4q'

with YoutubeDL(flags) as derexXD:
    info = derexXD.extract_info(url, download=False)

comments = info.get("comments", [])

with open("comments.json", "w") as file:
    json.dump(comments, file, indent=2)

print(f"Done\nExtracted {len(comments)} comments from el video")

# subprocess.run(
#     [
#         "yt-dlp",
#         "--skip-download",
#         "--write-comments",
#         "--no-write-info-json",
#         "--output",
#         "comments",
#         url,
#     ],
#     check=True
# )
