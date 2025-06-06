// Main site script
document.addEventListener('DOMContentLoaded', () => {
  // Inject shared header
  fetch('header.html')
    .then(r => r.text())
    .then(html => {
      const holder = document.getElementById('header');
      if (holder) {
        holder.innerHTML = html;
        const current = location.pathname.split('/').pop() || 'index.html';
        holder.querySelectorAll('.nav-link').forEach(link => {
          if (link.getAttribute('href') === current) {
            link.classList.add('text-accent');
          }
        });
        const btn = holder.querySelector('#menu-btn');
        const nav = holder.querySelector('#nav');
        if (btn && nav) btn.addEventListener('click', () => nav.classList.toggle('hidden'));
      }
    });

  // Scroll reveal
  const revealEls = document.querySelectorAll('[data-reveal]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => obs.observe(el));

  // Screenshot filter bar
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length) {
    const images = document.querySelectorAll('.gallery img');
    filterBtns.forEach(btn => btn.addEventListener('click', () => {
      const type = btn.dataset.filter;
      filterBtns.forEach(b => b.classList.remove('bg-accent','text-black'));
      btn.classList.add('bg-accent','text-black');
      images.forEach(img => {
        img.style.display = (type === 'all' || img.dataset.type === type) ? '' : 'none';
      });
    }));
  }

  // Lightbox
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    const imgs = Array.from(gallery.querySelectorAll('img'));
    let current = 0;
    const update = idx => {
      if (idx < 0) idx = imgs.length - 1;
      if (idx >= imgs.length) idx = 0;
      current = idx;
      const lb = document.querySelector('.lightbox');
      if (!lb) return;
      lb.querySelector('img').src = imgs[current].src;
      lb.querySelector('img').alt = imgs[current].alt;
      lb.querySelector('.caption').textContent = imgs[current].alt;
    };
    const open = idx => {
      current = idx;
      const lb = document.createElement('div');
      lb.className = 'lightbox';
      lb.innerHTML = `<button class="nav prev">&lt;</button>`+
        `<img src="${imgs[current].src}" alt="${imgs[current].alt}" loading="lazy">`+
        `<button class="nav next">&gt;</button>`+
        `<p class="caption">${imgs[current].alt}</p>`;
      lb.addEventListener('click', e => { if (e.target === lb) lb.remove(); });
      lb.querySelector('.prev').addEventListener('click', e => { e.stopPropagation(); update(current-1); });
      lb.querySelector('.next').addEventListener('click', e => { e.stopPropagation(); update(current+1); });
      document.addEventListener('keydown', keyHandler);
      document.body.appendChild(lb);
    };
    const keyHandler = e => {
      const lb = document.querySelector('.lightbox');
      if (!lb) return;
      if (e.key === 'Escape') lb.remove();
      if (e.key === 'ArrowRight') update(current+1);
      if (e.key === 'ArrowLeft') update(current-1);
    };
    gallery.addEventListener('click', e => {
      const target = e.target.closest('img');
      if (!target) return;
      open(imgs.indexOf(target));
    });
  }

  // Highlight.js code blocks
  if (window.hljs) hljs.highlightAll();

  // Fake load more posts
  const loadBtn = document.getElementById('loadMore');
  if (loadBtn) {
    loadBtn.addEventListener('click', () => {
      const posts = document.querySelectorAll('main article');
      posts.forEach(p => loadBtn.before(p.cloneNode(true)));
    });
  }
});
