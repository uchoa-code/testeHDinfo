document.getElementById("confirmLogout").addEventListener("click", function() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  window.location.href = "login.html";
});