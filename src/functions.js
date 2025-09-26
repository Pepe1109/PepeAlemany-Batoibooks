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