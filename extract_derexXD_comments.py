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
