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
    
}

function booksFromUser(books, userId) {
    
}

function booksFromModule(books, moduleCode) {
    
}

function booksCheeperThan(books, price) {
    
}

function booksWithStatus(books, status) {
    
}

function averagePriceOfBooks(books) {
    
}

function booksOfTypeNotes(books) {
    
}

function booksNotSold(books) {
    
}

function incrementPriceOfbooks(books, percentage) {
    
}


function getUserById(users, userId) {
    
}

function getUserIndexById(users, userId) {
    
}

function getUserByNickName(users, nick) {
    
}


function getModuleByCode(modules, moduleCode) {
    
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