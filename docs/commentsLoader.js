async function loadComments() {
  try {
    const response = await fetch("comments.json");
    const allComments = await response.json();

    renderComments(allComments);
  } catch (error) {
    console.error("Error loading comments:", error);
    document.getElementById("comments-list").innerHTML =
      '<li style="color: red; padding: 1rem;">Error loading comments. Please check if comments.json exists.</li>';
  }
}

/**
 * Likes get formatted, every 1000 likes is a K, every 1,000,000 is a M
 * @param {*} count 
 * @returns 
 */
function formatLikes(count) {
  if (count >= 1000) {
    return (count / 1000).toFixed(count >= 10000 ? 0 : 1) + "K";
  }
  if (count >= 1000000000) {
    return (count / 1000000000).toFixed(count >= 10000 ? 0 : 1) + "M";
  }
  return count.toString();
}

function createCommentHTML(comment) {
  const badges = [];

  if (comment.is_pinned) {
    badges.push('<span class="stat-badge pinned-badge">📌 Pinned</span>');
  }

//   if (comment.is_favorited) {
//     badges.push('<span class="stat-badge favorited-badge">❤️ Favorited</span>');
//   }

  return `
        <div class="comment">
            <div class="avatar">
                <a href="${comment.author_url}" target="_blank" rel="noopener noreferrer">
                    <img src="${comment.author_thumbnail}" alt="${comment.author}">
                </a>
            </div>
            <div class="comment__wrapper">
                <div class="comment__body">
                    <a href="${comment.author_url}" target="_blank" rel="noopener noreferrer" class="comment__author">${comment.author}</a>
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

/**
 * Render the comments into the HTML
 * @param {} comments 
 */
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
