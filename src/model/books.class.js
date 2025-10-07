import Book from "./book.class.js";

export default class Books {
  constructor() {
    this.data = [];
  }

  populate(books) {
    this.data = books.map(book => new Book(book));
  }

  addBook(bookData) {
    const newId = this.data.reduce((max, u) => Math.max(max, u.id), 0) + 1;
    const newBook = new Book({ id: newId, ...bookData });
    this.data.push(newBook);
    return this.data[this.data.length - 1];
  }

  removeBook(bookId) {
    const index = this.getBookIndexById(bookId);
    this.data.splice(index, 1);
  }

  changeBook(bookData) {
    const index = this.getBookIndexById(bookData.id);
    this.data[index] = new Book(bookData);
    return this.data[index];
  }

  getBookById(bookId) {
    const book = this.data.find(b => b.id === bookId);
    if (!book) throw new Error("Book not found");
    return book;
  }

  getBookIndexById(bookId) {
    const index = this.data.findIndex(b => b.id === bookId);
    if (index === -1) throw new Error("Book not found");
    return index;
  }

  bookExists(userId, moduleCode) {
    return this.data.some(b => b.userId === userId && b.moduleCode === moduleCode);
  }

  booksFromUser(userId) {
    return this.data.filter(b => b.userId === userId);
  }

  booksFromModule(moduleCode) {
    return this.data.filter(b => b.moduleCode === moduleCode);
  }

  booksCheeperThan(price) {
    return this.data.filter(b => b.price <= price);
  }

  booksWithStatus(status) {
    return this.data.filter(b => b.status === status);
  }

  averagePriceOfBooks() {
    if (this.data.length === 0) return "0.00 €";
    const media = this.data.reduce((acc, b) => acc + b.price, 0) / this.data.length;
    return media.toFixed(2) + " €";
  }

  booksOfTypeNotes() {
    return this.data.filter(b => b.publisher === "Apunts");
  }

  booksNotSold() {
    return this.data.filter(b => b.soldDate === "");
  }

  incrementPriceOfbooks(percentage) {
    this.data.forEach(b => {
      b.price = Number((b.price * (1 + percentage)).toFixed(2));
    });
    return this.data;
  }

  toString() {
    return this.data.map(b => b.toString()).join("\n");
  }
}
