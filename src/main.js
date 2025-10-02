import data from  './services/datos.js';
import {
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
} from './functions.js'

document.querySelector('#app').innerHTML = `
  <div>
    <center><img src="./public/logoBatoi.png"></center>
    <center>Abre la terminal</center
  </div>
`

console.log(booksFromModule(data.books, "5021"))
console.log(booksWithStatus(data.books, "new"))
console.log(incrementPriceOfbooks(data.books, 0.1))
