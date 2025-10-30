import './style.css'
import Books from "./model/books.class.js";
import Modules from "./model/modules.class.js";
import Users from "./model/users.class.js";
import Controller from './controller/controller.class.js';


import { getDBUsers, getDBBooks, getDBModules, getDBUser, addDBUser, addDBBook , removeDBBook, changeDBBook, changeDBUserPassword } from './services/api'



document.querySelector('#app').innerHTML = `
<div>
  <img src="public/logoBatoi.png" class="logo" alt="Batoi logo" />
  <header>BatoiBooks</header>
  <nav>
    <ul>
      <li><a href="#list">Ver Libros</a></li>
      <li><a href="#form">Añadir Libro</a></li>
      <li><a href="#about">Acerca de...</a></li>
    </ul>
  </nav>
</div>
<div id="messages"></div>
<div>
  <div id="list"></div>
  <div id="remove">
    <label for="idLibro">ID del libro:</label>
    <input type="number" name="id" id="idLibro" placeholder="Introduce la ID">
    <button type="button" id="btnBorrar">Borrar</button>
  </div>
</div>
<div id="form">
  <div>
  <label for="userId">userId: </label>
  <input type="number" name="userId" required>
</div>
<div>
  <label for="userId">moduleCode: </label>
  <select name="moduleCode" id="select" required>
    <option>tria el modul: </option>
  </select>
</div>
<div>
  <p>publisher: </p>
  <input type="radio" id="Apunts" name="publisher" value="apunts" required>
  <label for="opcion1">Apunts</label>

  <input type="radio" id="McGraw-Hill" name="publisher" value="McGraw-Hill">
  <label for="opcion2">McGraw-Hill</label>
</div>
<div>
  <label for="price">Precio: </label>
  <input type="number" name="price" required>
</div>
<div>
  <label for="pages">Paginas: </label>
  <input type="number" name="pages" required>
</div>
<div>
  <p>Status: </p>
  <input type="radio" id="good" name="status" value="good" required>
  <label for="opcion1">good</label>

  <input type="radio" id="bad" name="status" value="bad">
  <label for="opcion2">bad</label>
</div>
<div>
  <label for="comments">comentarios: </label>
  <input type="text" name="comments" required>
</div>
<div>
  <label for="soldDate">Fecha de venta: </label>
  <input type="date" name="soldDate" required>
</div>
</div>
<br>
<div id="about">
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem sapiente illum corrupti repellendus! Ad natus quod ullam quibusdam, cum perspiciatis iste ex est inventore doloribus. Tempore sit harum beatae assumenda.</p>
</div>
</div>
`
document.addEventListener('DOMContentLoaded', () => {
const myController = new Controller();
myController.init()
})