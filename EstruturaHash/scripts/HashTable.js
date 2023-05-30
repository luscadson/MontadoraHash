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
