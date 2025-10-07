import data from  './services/datos.js';
import Modules from "./model/modules.class.js";
import Users from "./model/users.class.js";
import Books from "./model/books.class.js";

document.querySelector('#app').innerHTML = `
  <div>
    <center><img src="./public/logoBatoi.png"></center>
    <center>Abre la terminal</center
  </div>
`

const modules = new Modules();
const users = new Users();
const books = new Books();

modules.populate(data.modules);
users.populate(data.users);
books.populate(data.books);

console.log(books.booksFromModule("5021"));
console.log(books.booksWithStatus("new"));
console.log(books.incrementPriceOfbooks(0.10));
