const API_BASE_URL = "https://testehdinfo.onrender.com";

function mostrarMensagem(texto, tipo) {
  const message = document.getElementById("message");

  message.textContent = texto;
  message.className = tipo;
}

function limparMensagemDepois() {
  setTimeout(() => {
    const message = document.getElementById("message");
    message.textContent = "";
    message.className = "";
  }, 3000);
}

document.getElementById("registerForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const password_confirm = document.getElementById("passwordConfirm").value.trim();
  const registerButton = document.getElementById("registerButton");

  try {
    registerButton.disabled = true;
    registerButton.textContent = "Criando usuário...";
    mostrarMensagem("Criando usuário...", "loading");

    const resposta = await fetch(`${API_BASE_URL}/api/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        email,
        password,
        password_confirm
      })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new Error(
        dados.username?.[0] ||
        dados.password?.[0] ||
        dados.password_confirm?.[0] ||
        dados.non_field_errors?.[0] ||
        "Erro ao cadastrar usuário."
      );
    }

    mostrarMensagem("Usuário cadastrado com sucesso!", "success");

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  } catch (error) {
    mostrarMensagem(error.message, "error");
    limparMensagemDepois();

    registerButton.disabled = false;
    registerButton.textContent = "Cadastrar";
  }
});