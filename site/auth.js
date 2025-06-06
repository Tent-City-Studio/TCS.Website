document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  async function handle(form, endpoint) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const json = await res.json();
        alert(json.message || json.error);
      } catch (err) {
        alert('Network error');
      }
    });
  }

  if (loginForm) handle(loginForm, '/api/login');
  if (signupForm) handle(signupForm, '/api/register');
});
