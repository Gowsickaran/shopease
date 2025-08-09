// ✅ Define safe toggle functions inside DOMContentLoaded and expose to global scope
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  // 🔁 Toggle Forms
  window.showSignup = function () {
    if (loginForm && signupForm) {
      loginForm.classList.add("hidden");
      signupForm.classList.remove("hidden");
    }
  };

  window.showLogin = function () {
    if (loginForm && signupForm) {
      signupForm.classList.add("hidden");
      loginForm.classList.remove("hidden");
    }
  };

  // 🔐 Signup
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("signupName").value;
      const email = document.getElementById("signupEmail").value;
      const password = document.getElementById("signupPassword").value;

      const res = await fetch("/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await res.json();
      alert(result.message);
      if (result.success) showLogin();
    });
  }

  // 🔓 Login
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();
      alert(result.message);
      if (result.success) window.location.href = "/index.html";
    });
  }
});
