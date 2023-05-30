const montadora = {
  deposito: new Map(),

  adicionarPeca: function(numeroIdentificacao, localizacao) {
    this.deposito.set(numeroIdentificacao, localizacao);
    this.salvarDeposito();
  },

  encontrarPeca: function(numeroIdentificacao) {
    if (this.deposito.has(numeroIdentificacao)) {
      return this.deposito.get(numeroIdentificacao);
    } else {
      return null;
    }
  },

  removerPeca: function(numeroIdentificacao) {
    if (this.deposito.has(numeroIdentificacao)) {
      this.deposito.delete(numeroIdentificacao);
      this.salvarDeposito();
      return true;
    } else {
      return false;
    }
  },

  salvarDeposito: function() {
    const depositoArray = Array.from(this.deposito.entries());
    localStorage.setItem('deposito', JSON.stringify(depositoArray));
  },

  carregarDeposito: function() {
    const depositoJSON = localStorage.getItem('deposito');
    if (depositoJSON) {
      const depositoArray = JSON.parse(depositoJSON);
      this.deposito = new Map(depositoArray);
    }
  }
};

function mostrarAdicionar() {
  ocultarTodasAsTelas();
  document.getElementById("adicionar").style.display = "flex";
}

function mostrarEncontrar() {
  ocultarTodasAsTelas();
  document.getElementById("encontrar").style.display = "flex";
}

function mostrarRemover() {
  ocultarTodasAsTelas();
  document.getElementById("remover").style.display = "flex";
}

function voltarMenu() {
  ocultarTodasAsTelas();
  document.getElementById("menu").style.display = "flex";
  limparMensagem();
}

function ocultarTodasAsTelas() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("adicionar").style.display = "none";
  document.getElementById("encontrar").style.display = "none";
  document.getElementById("remover").style.display = "none";
}

function adicionarPeca() {
  const idInput = document.getElementById("idInput");
  const localizacaoInput = document.getElementById("localizacaoInput");

  const id = idInput.value;
  const localizacao = localizacaoInput.value;

  montadora.adicionarPeca(id, localizacao);

  alert("Peça adicionada com sucesso!");

  idInput.value = "";
  localizacaoInput.value = "";
}

function encontrarPeca() {
  const idEncontrarInput = document.getElementById("idEncontrarInput");
  const id = idEncontrarInput.value;

  const localizacao = montadora.encontrarPeca(id);

  if (localizacao) {
    document.getElementById("encontrarMensagem").innerText = "A peça está localizada em: " + localizacao;
  } else {
    document.getElementById("encontrarMensagem").innerText = "Peça não encontrada no depósito.";
  }

  idEncontrarInput.value = "";
}

function removerPeca() {
  const idRemoverInput = document.getElementById("idRemoverInput");
  const id = idRemoverInput.value;

  const removido = montadora.removerPeca(id);

  if (removido) {
    document.getElementById("removerMensagem").innerText = "Peça removida com sucesso.";
  } else {
    document.getElementById("removerMensagem").innerText = "Peça não encontrada no depósito.";
  }

  idRemoverInput.value = "";
}

function limparMensagem() {
  document.getElementById("encontrarMensagem").innerText = "";
  document.getElementById("removerMensagem").innerText = "";
}

// Carregar o depósito do localStorage quando a página é carregada
montadora.carregarDeposito();

document.getElementById("adicionarBtn").addEventListener("click", mostrarAdicionar);
document.getElementById("encontrarBtn").addEventListener("click", mostrarEncontrar);
document.getElementById("removerBtn").addEventListener("click", mostrarRemover);
document.getElementById("adicionarVoltarBtn").addEventListener("click", voltarMenu);
document.getElementById("encontrarVoltarBtn").addEventListener("click", voltarMenu);
document.getElementById("removerVoltarBtn").addEventListener("click", voltarMenu);
document.getElementById("adicionarPecaBtn").addEventListener("click", adicionarPeca);
document.getElementById("encontrarPecaBtn").addEventListener("click", encontrarPeca);
document.getElementById("removerPecaBtn").addEventListener("click", removerPeca);
