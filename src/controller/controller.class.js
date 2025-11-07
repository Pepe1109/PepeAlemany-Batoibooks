import View from '../view/view.class';
import Users from '../model/users.class';
import Books from '../model/books.class';
import Modules from '../model/modules.class';
import Cart from '../model/cart.class.js';

export default class Controller {
  constructor() {
    this.view = new View();
    this.users = new Users();
    this.books = new Books();
    this.modules = new Modules();
    this.cart = new Cart();
  }

  async init() {
    console.log("🟢 Controller iniciado");
    try {
      await Promise.all([
        this.users.populate(),
        this.books.populate(),
        this.modules.populate(),
        this.cart.populate()
      ]);

      console.log("🟢 Datos cargados:", this.books.data.length, "libros");
      this.view.renderModulesInSelect(this.modules.data);
      this.view.renderBooks(this.books.data);

      this.view.setHandlers({
        onAddBook: this.handleAddOrEditSubmit.bind(this),
        onRemoveBook: this.handleRemoveBook.bind(this),
        onEditBook: this.handleEditAction.bind(this),
        onAddToCart: this.handleAddToCart.bind(this)
      });

      console.log("🟢 Handlers registrados");
    } catch (error) {
      console.error(error);
      this.view.renderMessage('error', 'Error cargando datos: ' + (error.message || error));
    }
  }

  async handleAddOrEditSubmit(payload) {
    try {
      if (payload && payload.id) {
        const updated = await this.books.changeBook(payload);
        this.view.renderBooks(this.books.data);
        this.view.renderMessage('info', `Libro ${payload.id} editado correctamente`);
      } else {
        payload.userId = payload.userId || 2;
        const newBook = await this.books.addBook(payload);
        this.view.renderBooks(this.books.data);
        this.view.renderMessage('info', `Libro añadido correctamente (id: ${newBook.id})`);
      }
    } catch (error) {
      console.error("Error en handleAddOrEditSubmit:", error);
      this.view.renderMessage('error', 'Error al guardar el libro: ' + (error.message || error));
    }
  }

  async handleEditAction(arg) {
    try {
      if (typeof arg === 'number' || typeof arg === 'string') {
        const id = Number(arg);
        console.log("✏️ Preparando edición para id:", id);
        const book = this.books.getBookById(id);
        if (!book || !book.id) throw new Error(`Book not found (${id})`);
        this.view.fillForm(book);
        return;
      }

      if (typeof arg === 'object' && arg !== null) {
        console.log("✏️ Recibido payload de edición:", arg);
        await this.handleAddOrEditSubmit(arg);
        return;
      }

      throw new Error('Argumento no válido para edición');
    } catch (error) {
      console.error("Error en handleEditAction:", error);
      this.view.renderMessage('error', 'No se pudo preparar la edición: ' + (error.message || error));
    }
  }

  async handleRemoveBook(bookId) {
    try {
      const id = Number(bookId);
      console.log("🗑️ handleRemoveBook llamado con id:", id);
      const book = this.books.getBookById(id);
      const confirmMsg = `¿Seguro que deseas eliminar el libro con id ${id} (${book.moduleCode || 'N/A'})?`;
      if (!window.confirm(confirmMsg)) return;

      await this.books.removeBook(id);
      try { this.cart.removeItem(id); } catch (e) {}
      this.view.renderBooks(this.books.data);
      this.view.renderMessage('info', `Libro ${id} eliminado correctamente`);
    } catch (error) {
      console.error("Error en handleRemoveBook:", error);
      this.view.renderMessage('error', 'No se ha podido borrar el libro: ' + (error.message || error));
    }
  }

  async handleAddToCart(bookId) {
    try {
      const id = Number(bookId);
      console.log("🛒 handleAddToCart llamado con id:", id);
      const book = this.books.getBookById(id);
      if (!book || !book.id) throw new Error('Book not found (' + id + ')');
      this.cart.addItem(book);
      this.view.renderMessage('info', `Libro ${id} añadido al carrito`);
    } catch (error) {
      console.error("Error en handleAddToCart:", error);
      this.view.renderMessage('error', error.message || 'Error al añadir al carrito');
    }
  }
}
