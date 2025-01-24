// static/js/login.js
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    // Check if the form exists
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent the default form submission

      // Get form data
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // Create an object to hold our data
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      // Send an AJAX request
      fetch(this.action, {
        method: "POST",
        body: formData,
        headers: {
          "X-CSRFToken": getCookie("csrftoken"), // Include CSRF token for security
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Login failed");
          }
        })
        .then((data) => {
          // Handle successful login
          document.getElementById("loginMessage").innerText =
            "Login successful!";
          window.location.href = "/"; // Redirect to the home page
        })
        .catch((error) => {
          document.getElementById("loginMessage").innerText = error.message;
        });
    });
  }
});

// Function to get the CSRF token from cookies
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
