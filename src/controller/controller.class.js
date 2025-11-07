import View from '../view/view.class';
import Users from '../model/users.class';
import Books from '../model/books.class';
import Modules from '../model/modules.class';
import Cart from '../model/cart.class.js';
import { addDBBook } from '../services/api';

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

      this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this));
      this.view.setFormResetHandler(this.handleFormReset.bind(this));
      this.view.setAddToCartHandler(this.handleAddToCart.bind(this));
      this.view.setEditBookHandler(this.handleEditBook.bind(this));
      this.view.setDeleteBookHandler(this.handleRemoveBook.bind(this));

    } catch (error) {
      console.error(error);
      this.view.renderMessage('error', 'Error cargando datos: ' + error);
    }
  }

  async handleSubmitBook(payload) {
    try {
      if (!payload.id) {
        payload.userId = 2;
        const newBook = await this.books.addBook(payload);
        this.view.renderBooks(this.books.data);
        this.view.renderMessage('info', `Libro añadido correctamente (id: ${newBook.id})`);
        this.view.resetFormToAddMode();
      } else {
        const updated = await this.books.updateBook(payload);
        this.view.renderBooks(this.books.data);
        this.view.renderMessage('info', `Libro ${payload.id} editado correctamente`);
        this.view.resetFormToAddMode();
      }
    } catch (error) {
      this.view.renderMessage('error', 'Error al guardar el libro: ' + error.message);
    }
  }

  async handleAddToCart(bookId) {
    try {
      const id = Number(bookId);
      const book = this.books.getBookById(id);
      if (!book || !book.id) throw new Error('Libro no encontrado');
      this.cart.addItem(book);
      this.view.renderMessage('info', `Libro ${id} añadido al carrito`);
    } catch (error) {
      this.view.renderMessage('error', error.message || 'Error al añadir al carrito');
    }
  }

  async handleRemoveBook(bookId) {
    try {
      const id = Number(bookId);
      const book = this.books.getBookById(id);
      const confirmMsg = `¿Seguro que deseas eliminar el libro con id ${id} (${book.moduleCode || 'N/A'})?`;
      if (!window.confirm(confirmMsg)) return;

      await this.books.removeBook(id);
      try { this.cart.removeItem(id); } catch (e) {}
      this.view.renderBooks(this.books.data);
      this.view.renderMessage('info', `Libro ${id} eliminado correctamente`);
    } catch (error) {
      this.view.renderMessage('error', 'No se ha podido borrar el libro: ' + error.message);
    }
  }

  async handleEditBook(bookId) {
    try {
      const id = Number(bookId);
      const book = this.books.getBookById(id);
      if (!book || !book.id) throw new Error('Libro no encontrado');

      this.view.fillFormForEdit(book);
      this.view.switchFormToEditMode();
    } catch (error) {
      this.view.renderMessage('error', 'No se pudo preparar la edición: ' + error.message);
    }
  }

  handleFormReset() {
    this.view.resetFormToAddMode();
  }
}
