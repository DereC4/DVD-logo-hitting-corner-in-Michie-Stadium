// For testing first few comments
async function loadComments() {
  try {
    const response = await fetch("comments.json");
    const allComments = await response.json();
    const first5Comments = allComments.slice(0, 5);

    renderComments(first5Comments);
  } catch (error) {
    console.error("Error loading comments:", error);
    document.getElementById("comments-list").innerHTML =
      '<li style="color: red; padding: 1rem;">Error loading comments. Please check if comments.json exists.</li>';
  }
}

function formatLikes(count) {
  if (count >= 1000) {
    return (count / 1000).toFixed(count >= 10000 ? 0 : 1) + "K";
  }
  return count.toString();
}

function createCommentHTML(comment) {
  const badges = [];
  if (comment.is_pinned) {
    badges.push('<span class="stat-badge pinned-badge">📌 Pinned</span>');
  }
  if (comment.is_favorited) {
    badges.push('<span class="stat-badge favorited-badge">❤️ Favorited</span>');
  }

  return `
        <div class="comment">
            <div class="avatar">
                <img src="${comment.author_thumbnail}" alt="${comment.author}">
            </div>
            <div class="comment__wrapper">
                <div class="comment__body">
                    <span class="comment__author">${comment.author}</span>
                    <p class="comment__text" dir="auto">${comment.text}</p>
                </div>
                <div class="comment__stats">
                    ${badges.join("")}
                </div>
                <div class="comment__meta">
                    <span class="comment__likes">👍 ${formatLikes(comment.like_count)}</span>
                    <span class="comment__time">${comment._time_text}</span>
                </div>
            </div>
        </div>
    `;
}

// <div class="comment__actions">
//     <a href="#">Like</a>
//     <a href="#">Reply</a>
// </div>

function renderComments(comments) {
  const commentsList = document.getElementById("comments-list");
  commentsList.innerHTML = "";

  comments.forEach((comment) => {
    const li = document.createElement("li");
    li.innerHTML = createCommentHTML(comment);
    commentsList.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", loadComments);
