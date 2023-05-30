// Classe responsável pela tabela hash
class HashTable {
  constructor() {
    this.deposito = new Map();
    this.size = 0;
  }

  // Função de hash para calcular o índice
  _hash(id) {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash += id.charCodeAt(i);
    }
    return hash % 127; // Ou qualquer outro valor desejado para o tamanho da tabela
  }

  // Adiciona uma peça à tabela hash
  adicionarPeca(id, prateleira) {
    const hash = this._hash(id);
    let pecas;

    if (this.deposito.has(hash)) {
      pecas = this.deposito.get(hash);
      if (!(pecas instanceof Set)) {
        pecas = new Set();
        this.deposito.set(hash, pecas);
      }
    } else {
      pecas = new Set();
      this.deposito.set(hash, pecas);
    }

    pecas.add({ id, prateleira });
    this.size++;
  }

  // Busca uma peça na tabela hash
  buscarPeca(id) {
    const hash = this._hash(id);
    if (this.deposito.has(hash)) {
      const pecas = this.deposito.get(hash);
      if (pecas instanceof Set) {
        for (const peca of pecas) {
          if (peca.id === id) {
            return peca.prateleira;
          }
        }
      }
    }
    return undefined;
  }

  // Remove uma peça da tabela hash
  removerPeca(id) {
    const hash = this._hash(id);
    if (this.deposito.has(hash)) {
      const pecas = this.deposito.get(hash);
      if (pecas instanceof Set) {
        for (const peca of pecas) {
          if (peca.id === id) {
            pecas.delete(peca);
            console.log("Peça removida com sucesso.");
            this.size--;
            return true;
          }
        }
      }
    }
    console.log("Peça não encontrada.");
    return false;
  }

  // Salva a tabela hash no armazenamento local
  salvar() {
    const prateleiraArray = Array.from(this.deposito.entries());
    localStorage.setItem('prateleira', JSON.stringify(prateleiraArray));
  }

  // Carrega a tabela hash do armazenamento local
  carregar() {
    const prateleiraJSON = localStorage.getItem('prateleira');
    if (prateleiraJSON) {
      const prateleiraArray = JSON.parse(prateleiraJSON);
      this.deposito = new Map(prateleiraArray);
      this.size = this.deposito.size;
    }
  }
}



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
  // carregar() {
  //   const prateleiraJSON = localStorage.getItem('prateleira');
  //   if (prateleiraJSON) {
  //     try {
  //       const prateleiraArray = JSON.parse(prateleiraJSON);
  //       this.ht.deposito = new Map(prateleiraArray);
  //       this.ht.size = this.ht.deposito.size;
  //       console.log('Dados da tabela hash carregados com sucesso:', this.ht.deposito);
  //     } catch (error) {
  //       console.error('Erro ao carregar os dados da tabela hash:', error);
  //     }
  //   } else {
  //     console.log('Nenhum dado encontrado no armazenamento local.');
  //   }
  // }

}

// Instância da classe UserInterface para iniciar a aplicação
const ui = new UserInterface();
ui.ht.carregar();