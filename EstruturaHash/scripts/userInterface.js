
// Classe responsável pela manipulação da interface do usuário
class UserInterface {
  constructor() {
    this.ht = new HashTable();
    this.initEventListeners();
    this.ht.carregar(); // Carrega os dados do armazenamento local
  }

  initEventListeners() {
    document.getElementById('adicionarBtn').addEventListener('click', this.mostrarAdicionar.bind(this));
    document.getElementById('encontrarBtn').addEventListener('click', this.mostrarEncontrar.bind(this));
    document.getElementById('removerBtn').addEventListener('click', this.mostrarRemover.bind(this));
    document.getElementById('adicionarVoltarBtn').addEventListener('click', this.voltarMenu.bind(this));
    document.getElementById('encontrarVoltarBtn').addEventListener('click', this.voltarMenu.bind(this));
    document.getElementById('removerVoltarBtn').addEventListener('click', this.voltarMenu.bind(this));
    document.getElementById('adicionarPecaBtn').addEventListener('click', this.adicionarPeca.bind(this));
    document.getElementById('encontrarPecaBtn').addEventListener('click', this.encontrarPeca.bind(this));
    document.getElementById('removerPecaBtn').addEventListener('click', this.removerPeca.bind(this));
  }

  mostrarAdicionar() {
    this.ocultarTodasAsTelas();
    document.getElementById('adicionar').style.display = 'flex';
  }

  mostrarEncontrar() {
    this.ocultarTodasAsTelas();
    document.getElementById('encontrar').style.display = 'flex';
  }

  mostrarRemover() {
    this.ocultarTodasAsTelas();
    document.getElementById('remover').style.display = 'flex';
  }

  voltarMenu() {
    this.ocultarTodasAsTelas();
    document.getElementById('menu').style.display = 'flex';
    this.limparMensagem();
  }

  ocultarTodasAsTelas() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('adicionar').style.display = 'none';
    document.getElementById('encontrar').style.display = 'none';
    document.getElementById('remover').style.display = 'none';
  }

  adicionarPeca() {
    const idInput = document.getElementById('idInput');
    const localizacaoInput = document.getElementById('localizacaoInput');

    const id = idInput.value;
    const localizacao = localizacaoInput.value;

    if (id && localizacao) {
      this.ht.adicionarPeca(id, localizacao);
      this.ht.salvar();

      document.getElementById('adicionarMensagem').innerText =
        'A peça com ID: ' + id + ' foi colocada na prateleira: ' + localizacao + ' com sucesso!';

      idInput.value = '';
      localizacaoInput.value = '';
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

  encontrarPeca() {
    const idEncontrarInput = document.getElementById('idEncontrarInput');
    const id = idEncontrarInput.value;
    const localizacao = this.ht.buscarPeca(id);

    if (localizacao) {
      document.getElementById('encontrarMensagem').innerText =
        'A peça com ID: ' + id + ' está na prateleira: ' + localizacao;
    } else {
      document.getElementById('encontrarMensagem').innerText =
        'A peça com ID: ' + id + ' não foi encontrada.';
    }

    idEncontrarInput.value = '';
  }

  removerPeca() {
    const idRemoverInput = document.getElementById('idRemoverInput');
    const id = idRemoverInput.value;
    const removido = this.ht.removerPeca(id);
    if (removido) {
      this.ht.salvar();
      document.getElementById('removerMensagem').innerText =
        'A peça com ID: ' + id + ' foi removida com sucesso!';
    } else {
      document.getElementById('removerMensagem').innerText =
        'A peça com ID: ' + id + ' não foi encontrada.';
    }

    idRemoverInput.value = '';
  }

  limparMensagem() {
    document.getElementById('adicionarMensagem').innerText = '';
    document.getElementById('encontrarMensagem').innerText = '';
    document.getElementById('removerMensagem').innerText = '';
  }
}

// Instância da classe UserInterface para iniciar a aplicação
const ui = new UserInterface();