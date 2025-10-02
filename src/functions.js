 function getBookById(books, bookId) {
    const book = books.find(book => book.id === bookId);
    if (!book) throw new Error('Book not found');
    return book;
 }

  function getBookIndexById(books, bookId) {
    const index = books.findIndex(book => book.id === bookId);
    if (index === -1) throw new Error('Book not found');
    return index;
 }


function bookExists(books, userId, moduleCode) {
    return books.some(book => book.userId === userId && book.moduleCode === moduleCode )
}

function booksFromUser(books, userId) {
    return books.filter(book => book.userId === userId)
}

function booksFromModule(books, moduleCode) {
    return books.filter(book => book.moduleCode === moduleCode)
}

function booksCheeperThan(books, price) {
    return books.filter(book => book.id && book.price <= price)
}

function booksWithStatus(books, status) {
    return books.filter(book => book.id && book.status === status)
}

function averagePriceOfBooks(books) {
    const media = books.reduce((acc, book) => acc + book.price, 0) / books.length || 0;
    return media.toFixed(2) + ' €';
}


function booksOfTypeNotes(books) {
    return books.filter(book => book.id && book.publisher === 'Apunts')
}

function booksNotSold(books) {
    return books.filter(book => book.id && book.soldDate === '')
}

function incrementPriceOfbooks(books, percentage) {
  return books.map(book => ({
    ...book,
    price: Number((book.price * (1 + percentage)).toFixed(2))
  }));
}


function getUserById(users, userId) {
  const user = users.find(user => user.id === userId);
  if (!user) throw new Error('User not found');
  return user;
}

function getUserIndexById(users, userId) {
    const index = users.findIndex(users => users.id === userId);
    if (index === -1) throw new Error('User not found');
    return index;
}

function getUserByNickName(users, nick) {
  const user = users.find(user => user.nick === nick);
  if (!user) throw new Error('User not found');
  return user;
}

function getModuleByCode(modules, moduleCode) {
  const module = modules.find(module => module.code === moduleCode);
  if (!module) throw new Error('Module not found');
  return module;
}


 export {
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
  incrementPriceOfbooks,
  getUserById,
  getUserIndexById,
  getUserByNickName,
  getModuleByCode
}