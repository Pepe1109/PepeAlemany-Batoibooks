import './style.css';
import Controller from './controller/controller.class.js';

// Renderizado base del HTML
document.querySelector('#app').innerHTML = `
  <header>
    <img src="/logoBatoi.png" class="logo" alt="Batoi logo" />
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
    <section id="form-section">
      <h2>Añadir / Editar libro</h2>

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
    </section>

    <section id="remove">
      <h2>Borrar libro</h2>
      <label for="idLibro">ID del libro:</label>
      <input type="number" id="idLibro" placeholder="Introduce la ID">
      <button id="btnBorrar">Borrar</button>
    </section>

    <section id="list">
      <!-- Aquí se renderizan las tarjetas de libros -->
    </section>

    <section id="about">
      <h2>Acerca de...</h2>
      <p>BatoiBooks - Aplicación de gestión de libros desarrollada como parte del Proyecto Integrado DAW.</p>
    </section>
  </main>

  <footer>
    <p>Hecho por Pepe</p>
  </footer>
`;

// Inicializar el controlador cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const myController = new Controller();
  myController.init();
});
