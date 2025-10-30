import './style.css'
import Controller from './controller/controller.class.js'

// Renderizado base del HTML
document.querySelector('#app').innerHTML = `
  <header>
    <img src="public/logoBatoi.png" class="logo" alt="Batoi logo" />
    <h1>BatoiBooks</h1>
  </header>

  <nav>
    <ul>
      <li><a href="#list">Ver Libros</a></li>
      <li><a href="#form">Añadir Libro</a></li>
      <li><a href="#about">Acerca de...</a></li>
    </ul>
  </nav>

  <div id="messages"></div>

  <main>
    <div id="remove">
      <label for="idLibro">ID del libro:</label>
      <input type="number" id="idLibro" placeholder="Introduce la ID">
      <button id="btnBorrar">Borrar</button>
    </div>

    <form id="bookForm">
      <div>
        <label for="userId">User ID:</label>
        <input type="number" name="userId" required>
      </div>

      <div>
        <label for="bookModule">Módulo:</label>
        <select name="moduleCode" id="bookModule" required>
          <option value="">Selecciona un módulo</option>
        </select>
      </div>

      <div>
        <p>Editorial:</p>
        <label><input type="radio" name="publisher" value="Apunts" required> Apunts</label>
        <label><input type="radio" name="publisher" value="McGraw-Hill"> McGraw-Hill</label>
      </div>

      <div>
        <label for="price">Precio:</label>
        <input type="number" name="price" step="0.01" required>
      </div>

      <div>
        <label for="pages">Páginas:</label>
        <input type="number" name="pages" required>
      </div>

      <div>
        <p>Estado:</p>
        <label><input type="radio" name="status" value="good" required> Bueno</label>
        <label><input type="radio" name="status" value="bad"> Malo</label>
      </div>

      <div>
        <label for="comments">Comentarios:</label>
        <input type="text" name="comments">
      </div>

      <div>
        <label for="soldDate">Fecha de venta:</label>
        <input type="date" name="soldDate">
      </div>

      <button type="submit">Guardar</button>
      <button type="reset">Reset</button>
    </form>

    <section id="about">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem sapiente illum corrupti repellendus! Ad natus quod ullam quibusdam, cum perspiciatis iste ex est inventore doloribus.</p>
    </section>
  </main>
  <div id="list"></div>

  <footer>
    <p>Hecho por Pepe</p>
  </footer>
`;

document.addEventListener('DOMContentLoaded', () => {
  const myController = new Controller();
  myController.init();
});
