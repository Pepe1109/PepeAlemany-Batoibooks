export default class View {
  constructor() {
    this.messages = document.getElementById("messages");
    this.booksList = document.getElementById("list");
    this.bookForm = document.getElementById("bookForm");
    this.remove = document.getElementById("remove");
    this.removeBtn = document.getElementById("btnBorrar");
    this.removeInput = document.getElementById("idLibro");
    this.about = document.getElementById("about");
    this.titleForm = document.createElement("h2");
    this.titleForm.textContent = "Añadir libro";
    this.bookForm.prepend(this.titleForm);
    this.idDiv = document.createElement("div");
    this.idDiv.innerHTML = `
      <label for="id">ID:</label>
      <input type="number" name="id" id="bookId" disabled>
    `;
    this.idDiv.style.display = "none";
    this.bookForm.prepend(this.idDiv);

    // 🔹 callbacks (los establecerá el controller)
    this.onAddBook = null;
    this.onRemoveBook = null;
    this.onEditBook = null;
    this.onAddToCart = null;
  }

  renderModulesInSelect(modules) {
    const select = document.getElementById("bookModule");
    select.innerHTML = "";

    modules.forEach((module) => {
      const option = document.createElement("option");
      option.value = module.code;
      option.textContent = `${module.cliteral} (${module.code})`;
      select.append(option);
    });
  }

  renderBooks(books) {
    this.booksList.innerHTML = "";

    if (!books || books.length === 0) {
      this.booksList.innerHTML = "<p>No hay libros disponibles.</p>";
      return;
    }

    books.forEach((book) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("data-id", book.id);

      const imgSrc = book.photo ? book.photo : "img/default-book.png";
      const vendido = book.soldDate ? `Vendido el ${book.soldDate}` : "En venta";

      card.innerHTML = `
        <img src="${imgSrc}" alt="Libro ${book.id}">
        <div class="card-info">
          <h3>${book.moduleCode} (${book.id})</h3>
          <h4>${book.publisher}</h4>
          <p>${book.pages} páginas</p>
          <p>Estado: ${book.status}</p>
          <p>${vendido}</p>
          <p>${book.comments || ""}</p>
          <h4><strong>${book.price.toFixed(2)} €</strong></h4>
        </div>
        <div class="card-buttons">
          <button class="add-cart"><i class="material-icons">add_shopping_cart</i></button>
          <button class="edit-book"><i class="material-icons">edit</i></button>
          <button class="delete-book"><i class="material-icons">delete</i></button>
        </div>
      `;

      // 🎯 Eventos de los botones
      card.querySelector(".add-cart").addEventListener("click", () => {
        if (this.onAddToCart) this.onAddToCart(book.id);
      });

      card.querySelector(".edit-book").addEventListener("click", () => {
        if (this.onEditBook) this.onEditBook(book.id);
      });

      card.querySelector(".delete-book").addEventListener("click", () => {
        if (this.onRemoveBook) this.onRemoveBook(book.id);
      });

      this.booksList.append(card);
    });
  }

  fillForm(book) {
    this.titleForm.textContent = "Editar libro";
    this.idDiv.style.display = "block";
    this.bookForm["bookId"].value = book.id;
    this.bookForm["bookModule"].value = book.moduleCode;
    this.bookForm["publisher"].value = book.publisher;
    this.bookForm["price"].value = book.price;
    this.bookForm["pages"].value = book.pages;
    this.bookForm["status"].value = book.status;
    this.bookForm["comments"].value = book.comments || "";
  }

  resetForm() {
    this.bookForm.reset();
    this.titleForm.textContent = "Añadir libro";
    this.idDiv.style.display = "none";
  }

  renderMessage(type, message) {
    const newMessage = document.createElement("div");
    const alertClass = type === "error" ? "alert-danger" : "alert-info";
    newMessage.className = `alert ${alertClass}`;
    newMessage.innerHTML = `
      ${message}
      <button type="button" class="btn-close" aria-label="Close" onclick="this.parentElement.remove()"></button>
    `;
    this.messages.append(newMessage);
    if (type !== "error") {
      setTimeout(() => newMessage.remove(), 3000);
    }
  }

  setHandlers({ onAddBook, onRemoveBook, onEditBook, onAddToCart }) {
    this.onAddBook = onAddBook;
    this.onRemoveBook = onRemoveBook;
    this.onEditBook = onEditBook;
    this.onAddToCart = onAddToCart;

    this.bookForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const payload = {
        id: Number(this.bookForm["bookId"].value) || null,
        userId: 2, // usuario por defecto
        moduleCode: this.bookForm["bookModule"].value,
        publisher: this.bookForm["publisher"].value,
        price: Number(this.bookForm["price"].value),
        pages: Number(this.bookForm["pages"].value),
        status: this.bookForm["status"].value,
        comments: this.bookForm["comments"].value,
        soldDate: this.bookForm["soldDate"].value || "",
      };

      if (this.titleForm.textContent === "Editar libro") {
        if (this.onEditBook) this.onEditBook(payload);
      } else {
        if (this.onAddBook) this.onAddBook(payload);
      }

      this.resetForm();
    });

    this.bookForm.addEventListener("reset", () => this.resetForm());
  }
}
