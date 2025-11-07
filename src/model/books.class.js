import Book from "./book.class.js";
import {
  getDBBooks,
  addDBBook,
  removeDBBook,
  changeDBBook,
  getBookById,
  getBookIndexById,
  bookExists,
  booksFromUser,
  booksFromModule,
  booksCheeperThan,
  booksWithStatus,
  averagePriceOfBooks,
  booksOfTypeNotes,
  booksNotSold,
} from "../services/api.js";

export default class Books {
  constructor() {
    this.data = [];
  }

  // Carga todos los libros desde la API
  async populate() {
    const books = await getDBBooks();
    this.data = books.map(b => new Book(b));
  }

  // Añade un nuevo libro (espera confirmación de la API)
  async addBook(bookData) {
  const maxId = this.data.length > 0
    ? Math.max(...this.data.map(b => Number(b.id) || 0))
    : 0;

  const newId = String(maxId + 1);
  const newBookData = { ...bookData, id: newId };
  const added = await addDBBook(newBookData);
  const newBook = new Book(added);
  this.data.push(newBook);

  return newBook;
}


// Elimina un libro de la BBDD y del array local
  async removeBook(id) {
  const numId = Number(id);

  await removeDBBook(numId);

  const index = this.data.findIndex(book => Number(book.id) === numId);
  if (index === -1) throw new Error(`Book not found (id: ${numId})`);

  this.data.splice(index, 1);
}

  // Modifica un libro existente
  async changeBook(bookData) {
    const updated = await changeDBBook(bookData);
    const index = this.data.findIndex(b => b.id === updated.id);
    if (index === -1) throw new Error("Book not found");
    this.data[index] = new Book(updated);
    return this.data[index];
  }

  // Métodos locales reutilizando tus funciones originales
  getBookById(bookId) {
    const numId = Number(bookId);
    const book = this.data.find(b => Number(b.id) === numId);
    if (!book) throw new Error(`Book not found (id: ${numId})`);
    return book;
  }


  getBookIndexById(bookId) {
    return getBookIndexById(this.data, bookId);
  }

  bookExists(userId, moduleCode) {
    return bookExists(this.data, userId, moduleCode);
  }

  booksFromUser(userId) {
    return booksFromUser(this.data, userId);
  }

  booksFromModule(moduleCode) {
    return booksFromModule(this.data, moduleCode);
  }

  booksCheeperThan(price) {
    return booksCheeperThan(this.data, price);
  }

  booksWithStatus(status) {
    return booksWithStatus(this.data, status);
  }

  averagePriceOfBooks() {
    return averagePriceOfBooks(this.data);
  }

  booksOfTypeNotes() {
    return booksOfTypeNotes(this.data);
  }

  booksNotSold() {
    return booksNotSold(this.data);
  }

  toString() {
    return this.data.map(b => b.toString()).join("\n");
  }
}
