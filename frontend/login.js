const API_BASE_URL = "https://testehdinfo.onrender.com";

function mostrarMensagem(texto, tipo) {
  const message = document.getElementById("message");

  message.textContent = texto;
  message.className = tipo;

  setTimeout(() => {
    message.textContent = "";
    message.className = "";
  }, 3000);
}

document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const resposta = await fetch(`${API_BASE_URL}/api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    if (!resposta.ok) {
      throw new Error("Usuário ou senha inválidos.");
    }

    const dados = await resposta.json();

    localStorage.setItem("accessToken", dados.access);
    localStorage.setItem("refreshToken", dados.refresh);

    window.location.href = "index.html";
  } catch (error) {
    mostrarMensagem(error.message, "error");
  }
});