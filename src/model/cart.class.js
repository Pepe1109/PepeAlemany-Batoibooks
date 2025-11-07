export default class Cart {
  constructor() {
    this.data = [];
  }
  async populate() {
    this.data = [];
  }

  getBookById(id) {
    const found = this.data.find((book) => book.id === id);
    return found ? found : {};
  }

  addItem(book) {
    if (!book || !book.id) {
      throw new Error('Libro no válido');
    }

    const exists = this.data.find((item) => item.id === book.id);
    if (exists) {
      throw new Error(`El libro con id ${book.id} ya está en el carrito`);
    }

    const copy = JSON.parse(JSON.stringify(book));
    this.data.push(copy);
  }

  removeItem(id) {
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error(`El libro con id ${id} no está en el carrito`);
    }

    this.data.splice(index, 1);
  }

  toString() {
    if (this.data.length === 0) return 'El carrito está vacío.';
    return this.data
      .map(
        (book) =>
          `(${book.id}) ${book.moduleCode} - ${book.publisher} - ${book.price.toFixed(
            2
          )} €`
      )
      .join('\n');
  }
}
