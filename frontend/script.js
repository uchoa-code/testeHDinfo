const API_URL = "https://testehdinfo.onrender.com/api/tasks/";
const API_BASE_URL = "https://testehdinfo.onrender.com";

let filtroAtual = "todas";


function mostrarMensagem(texto, tipo) {
  const message = document.getElementById("message");

  message.textContent = texto;
  message.className = tipo;

  setTimeout(() => {
    message.textContent = "";
    message.className = "";
  }, 3000);
}

async function carregarTarefas() {
  try {
    let url = API_URL;

    if (filtroAtual === "concluidas") {
      url += "?completed=true";
    }

    if (filtroAtual === "pendentes") {
      url += "?completed=false";
    }

    const resposta = await fetchComToken(url);

    if (!resposta.ok) {
      throw new Error("Erro ao carregar tarefas.");
    }

    const tarefas = await resposta.json();

    const lista = document.getElementById("taskList");
    lista.innerHTML = "";

    tarefas.forEach(tarefa => {
      const item = document.createElement("li");

      item.innerHTML = `
        <div class="task-top">
          <strong>${tarefa.title}</strong><br>
          ${tarefa.description}<br>
          ${tarefa.completed ? "✅ Concluída" : "⏳ Pendente"}
        </div>

        <div class="task-buttons">
          <button class="secondary"
            onclick="prepararEdicao('${tarefa.id}', '${tarefa.title}', '${tarefa.description}')">
            Editar
          </button>

          <button class="success"
            onclick="alterarStatus('${tarefa.id}', ${tarefa.completed})">
            ${tarefa.completed ? "Reabrir" : "Concluir"}
          </button>

          <button class="danger"
            onclick="deletarTarefa('${tarefa.id}')">
            Deletar
          </button>
        </div>
      `;

      lista.appendChild(item);
    });
  } catch (error) {
    mostrarMensagem(error.message, "error");
  }
}

function filtrarTarefas(filtro) {
  filtroAtual = filtro;
  carregarTarefas();
}

document.getElementById("form").addEventListener("submit", async function(e) {
  e.preventDefault();

  const id = document.getElementById("taskId").value;
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  try {
    let resposta;

    if (id) {
      resposta = await fetchComToken(`${API_URL}${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, description })
      });
    } else {
      resposta = await fetchComToken(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          description,
          completed: false
        })
      });
    }

    if (!resposta.ok) {
      const erro = await resposta.json();
      throw new Error(
        erro.title?.[0] ||
        erro.description?.[0] ||
        "Erro ao salvar tarefa."
      );
    }

    limparFormulario();
    carregarTarefas();

    mostrarMensagem("Salvo com sucesso!", "success");
  } catch (error) {
    mostrarMensagem(error.message, "error");
  }
});

function prepararEdicao(id, title, description) {
  document.getElementById("taskId").value = id;
  document.getElementById("title").value = title;
  document.getElementById("description").value = description;

  document.getElementById("submitButton").textContent = "Salvar edição";
  document.getElementById("cancelButton").style.display = "inline";
}

function limparFormulario() {
  document.getElementById("form").reset();
  document.getElementById("taskId").value = "";

  document.getElementById("submitButton").textContent = "Adicionar";
  document.getElementById("cancelButton").style.display = "none";
}

document.getElementById("cancelButton").addEventListener("click", limparFormulario);

async function alterarStatus(id, completed) {
  try {
    const resposta = await fetchComToken(`${API_URL}${id}/completed/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        completed: !completed
      })
    });

    if (!resposta.ok) {
      throw new Error("Erro ao atualizar status da tarefa.");
    }

    carregarTarefas();
    mostrarMensagem("Status atualizado com sucesso!", "success");
  } catch (error) {
    mostrarMensagem(error.message, "error");
  }
}

async function deletarTarefa(id) {
  try {
    const resposta = await fetchComToken(`${API_URL}${id}/`, {
      method: "DELETE"
    });

    if (!resposta.ok) {
      throw new Error("Erro ao deletar tarefa.");
    }

    carregarTarefas();
    mostrarMensagem("Tarefa deletada com sucesso!", "success");
  } catch (error) {
    mostrarMensagem(error.message, "error");
  }
}

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "login.html";
}

function verificarLogin() {
  const token = getAccessToken();

  if (!token) {
    window.location.href = "login.html";
  }
}

async function fetchComToken(url, options = {}) {
  const token = getAccessToken();

  const resposta = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      ...options.headers
    }
  });

  if (resposta.status === 401) {
    logout();
    throw new Error("Sessão expirada. Faça login novamente.");
  }

  return resposta;
}

verificarLogin();
carregarTarefas();