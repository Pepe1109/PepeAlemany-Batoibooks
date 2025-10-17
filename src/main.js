import Modules from "./model/modules.class.js";
import Users from "./model/users.class.js";
import Books from "./model/books.class.js";

document.querySelector("#app").innerHTML = `
  <div>
    <center><img src="./public/logoBatoi.png" alt="Logo Batoi"></center>
    <center>Abre la terminal</center>
  </div>
`;

async function main() {
  const modules = new Modules();
  const users = new Users();
  const books = new Books();

  await modules.populate();
  await users.populate();
  await books.populate();

  console.log("Libros del módulo 5021:");
  console.log(books.booksFromModule("5021"));

  console.log("Libros con estado 'new':");
  console.log(books.booksWithStatus("new"));

  console.log("Precio medio de los libros:");
  console.log(books.averagePriceOfBooks());
}

main();

