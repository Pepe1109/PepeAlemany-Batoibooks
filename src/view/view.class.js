export default class View {
  constructor() {
    this.messages = document.getElementById("messages");
    this.booksList = document.getElementById("list");
    this.bookForm = document.getElementById("bookForm");
    this.remove = document.getElementById("remove");
    this.removeBtn = document.getElementById("btnBorrar");
    this.removeInput = document.getElementById("idLibro");
    this.about = document.getElementById("about");
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

    console.log("🟣 renderBooks recibe:", books);
    if (!books || books.length === 0) {
        console.warn("⚠️ No hay libros que renderizar");
        return;
    }

    this.booksList.innerHTML = "";

    books.forEach((book) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("data-id", book.id);

      const imgSrc = book.photo ? book.photo : "img/default-book.png";
      const vendido = book.soldDate
        ? `Vendido el ${book.soldDate}`
        : "En venta";

      card.innerHTML = `
        <img src="${imgSrc}" alt="Libro: ${book.id}">
        <div>
          <h3>${book.moduleCode} (${book.id})</h3>
          <h4>${book.publisher}</h4>
          <p>${book.pages} páginas</p>
          <p>Estado: ${book.status}</p>
          <p>${vendido}</p>
          <p>${book.comments || ""}</p>
          <h4><strong>${book.price.toFixed(2)} €</strong></h4>
        </div>
      `;

      this.booksList.append(card);
    });

  }

  deleteBook(book) {
    const bookCard = this.booksList.querySelector(`[data-id="${book.id}"]`);
    if (bookCard) bookCard.remove();
  }


  renderMessage(type, message) {
    const newMessage = document.createElement("div");

    const alertClass =
      type === "error" ? "alert-danger" : "alert-info";

    newMessage.className = `alert ${alertClass} alert-dismissible`;
    newMessage.role = "alert";

    newMessage.innerHTML = `
      ${message}
      <button type="button" class="btn-close" aria-label="Close" onclick="this.parentElement.remove()"></button>
    `;

    this.messages.append(newMessage);


    if (type !== "error") {
      setTimeout(() => {
        if (newMessage.parentElement) newMessage.remove();
      }, 3000);
    }
  }

  setBookSubmitHandler(callback) {
    this.bookForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const payload = {
        title: this.bookForm["titulo"].value,
        author: this.bookForm["autor"].value,
        year: this.bookForm["anio"].value,
        moduleCode: this.bookForm["bookModule"].value,
        publisher: this.bookForm["editorial"].value,
        pages: Number(this.bookForm["paginas"].value),
        status: this.bookForm["estado"].value,
        price: Number(this.bookForm["precio"].value),
        comments: this.bookForm["comentarios"].value,
        soldDate: "",
      };

      callback(payload);
      this.bookForm.reset();
    });
  }

  setBookRemoveHandler(callback) {
    this.removeBtn.addEventListener("click", () => {
      const idToRemove = this.removeInput.value;
      callback(idToRemove);
      this.removeInput.value = "";
    });
  }
}