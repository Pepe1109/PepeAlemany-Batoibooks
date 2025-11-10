import Book from "./book.class.js";
import {
  getDBBooks,
  addDBBook,
  removeDBBook,
  changeDBBook,
  getBookById,
  getBookIndexById,
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

  async populate() {
    const books = await getDBBooks();
    this.data = books.map(b => new Book(b));
  }

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

  async removeBook(id) {
    const numId = Number(id);
    await removeDBBook(numId);
    const index = this.data.findIndex(book => Number(book.id) === numId);
    if (index === -1) throw new Error(`Book not found (id: ${numId})`);
    this.data.splice(index, 1);
  }

  async changeBook(bookData) {
    const updated = await changeDBBook(bookData);
    const index = this.data.findIndex(b => b.id === updated.id);
    if (index === -1) throw new Error("Book not found");
    this.data[index] = new Book(updated);
    return this.data[index];
  }

  getBookById(bookId) {
    const numId = Number(bookId);
    const book = this.data.find(b => Number(b.id) === numId);
    if (!book) throw new Error(`Book not found (id: ${numId})`);
    return book;
  }

  getBookIndexById(bookId) {
    return getBookIndexById(this.data, bookId);
  }

  async bookExists(userId, moduleCode) {
    const response = await fetch(`http://localhost:3000/books?userId=${userId}&moduleCode=${moduleCode}`);
    if (!response.ok) throw new Error("Error al comprobar libro existente");
    const data = await response.json();
    return data.length > 0;
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
