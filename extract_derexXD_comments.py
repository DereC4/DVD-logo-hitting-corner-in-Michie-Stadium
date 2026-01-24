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

def merge(list, left, mid, right):
    """I wrote a merge sort, it is 5:32 AM and Texas Winter Storm apparently about to hit"""
    # Merge sort takes O(n) space so it is not in place
    # two subarrays that are going to be merged, taking a slice
    L = list[left : mid + 1]
    R = list[mid + 1 : right + 1]

    i = 0 # Current position inside left subarray
    j = 0 # Current position inside right subaway
    k = left # Pos in original array

    

def mergeSort(list, left, right):
    """Split everything into tiny pieces. Then we begin sorting as the pieces are compared and put back together"""
    if left < right:
        mid = (left + right) // 2
        mergeSort(list, left, mid)
        mergeSort(list, mid + 1, right)
        merge(list, left, mid, right)



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
