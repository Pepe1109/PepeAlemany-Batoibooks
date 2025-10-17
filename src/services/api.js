const BASE_URL = "http://localhost:3000";

/* ─────────────────────────────────────────────
   📚 BOOKS
───────────────────────────────────────────── */

export async function getDBBooks() {
  const res = await fetch(`${BASE_URL}/books`);
  if (!res.ok) throw new Error("Error fetching books");
  return res.json();
}

export async function getDBBook(bookId) {
  const res = await fetch(`${BASE_URL}/books/${bookId}`);
  if (!res.ok) throw new Error("Book not found");
  return res.json();
}

export async function addDBBook(newBook) {
  const res = await fetch(`${BASE_URL}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newBook),
  });
  if (!res.ok) throw new Error("Error adding book");
  return res.json();
}

export async function removeDBBook(bookId) {
  const res = await fetch(`${BASE_URL}/books/${bookId}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error deleting book");
}

export async function changeDBBook(bookData) {
  const res = await fetch(`${BASE_URL}/books/${bookData.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookData),
  });
  if (!res.ok) throw new Error("Error updating book");
  return res.json();
}

export function getBookById(books, bookId) {
  const book = books.find(book => book.id === bookId);
  if (!book) throw new Error("Book not found");
  return book;
}

export function getBookIndexById(books, bookId) {
  const index = books.findIndex(book => book.id === bookId);
  if (index === -1) throw new Error("Book not found");
  return index;
}

export function bookExists(books, userId, moduleCode) {
  return books.some(book => book.userId === userId && book.moduleCode === moduleCode);
}

export function booksFromUser(books, userId) {
  return books.filter(book => book.userId === userId);
}

export function booksFromModule(books, moduleCode) {
  return books.filter(book => book.moduleCode === moduleCode);
}

export function booksCheeperThan(books, price) {
  return books.filter(book => book.id && book.price <= price);
}

export function booksWithStatus(books, status) {
  return books.filter(book => book.id && book.status === status);
}

export function averagePriceOfBooks(books) {
  const media = books.reduce((acc, book) => acc + book.price, 0) / books.length || 0;
  return media.toFixed(2) + " €";
}

export function booksOfTypeNotes(books) {
  return books.filter(book => book.id && book.publisher === "Apunts");
}

export function booksNotSold(books) {
  return books.filter(book => book.id && book.soldDate === "");
}

/* ─────────────────────────────────────────────
   👤 USERS
───────────────────────────────────────────── */

export async function getDBUsers() {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error("Error fetching users");
  return res.json();
}

export async function getDBUser(userId) {
  const res = await fetch(`${BASE_URL}/users/${userId}`);
  if (!res.ok) throw new Error("User not found");
  return res.json();
}

export async function addDBUser(newUser) {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  if (!res.ok) throw new Error("Error adding user");
  return res.json();
}

export async function removeDBUser(userId) {
  const res = await fetch(`${BASE_URL}/users/${userId}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error deleting user");
}

export async function changeDBUser(userData) {
  const res = await fetch(`${BASE_URL}/users/${userData.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error("Error updating user");
  return res.json();
}

export async function changeDBUserPassword(id, newPassword) {
  const user = await getDBUser(id);
  user.password = newPassword;
  return changeDBUser(user);
}

export function getUserById(users, userId) {
  const user = users.find(user => user.id === userId);
  if (!user) throw new Error("User not found");
  return user;
}

export function getUserIndexById(users, userId) {
  const index = users.findIndex(user => user.id === userId);
  if (index === -1) throw new Error("User not found");
  return index;
}

export function getUserByNickName(users, nick) {
  const user = users.find(user => user.nick === nick);
  if (!user) throw new Error("User not found");
  return user;
}

/* ─────────────────────────────────────────────
   📘 MODULES
───────────────────────────────────────────── */

export async function getDBModules() {
  const res = await fetch(`${BASE_URL}/modules`);
  if (!res.ok) throw new Error("Error fetching modules");
  return res.json();
}

export async function getDBModule(code) {
  const res = await fetch(`${BASE_URL}/modules/${code}`);
  if (!res.ok) throw new Error("Module not found");
  return res.json();
}

export function getModuleByCode(modules, moduleCode) {
  const module = modules.find(module => module.code === moduleCode);
  if (!module) throw new Error("Module not found");
  return module;
}
