async function loadBlogPosts() {
  try {
    const res = await fetch('/static/posts.json');
    if (!res.ok) throw new Error('Failed to load posts');
    const posts = await res.json();
    const container = document.getElementById('posts');
    posts.forEach(post => {
      const article = document.createElement('article');
      article.className = 'bg-gray-800 rounded-lg shadow p-6 space-y-2 mb-8';
      const date = new Date(post.date).toLocaleDateString(undefined, {
        year: 'numeric', month: 'long', day: 'numeric'
      });
      article.innerHTML = `
        <h2 class="text-2xl text-accent">${post.title}</h2>
        <p class="text-sm text-gray-400">${date}</p>
        <div class="mt-2">${post.content}</div>
        <div class="mt-4">
          <button class="share-btn px-3 py-1 bg-accent text-black rounded-full" data-title="${post.title}">Share</button>
        </div>
      `;
      container.appendChild(article);
    });
  } catch (err) {
    console.error(err);
  }
}

function handleShareClick(e) {
  const btn = e.target.closest('.share-btn');
  if (!btn) return;
  const title = btn.dataset.title || document.title;
  const url = location.href;
  if (navigator.share) {
    navigator.share({ title, url });
  } else {
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard');
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadBlogPosts();
  document.addEventListener('click', handleShareClick);
});
