export default class View {
    constructor() {
        this.messages = document.getElementById('messages');
        this.booksList = document.getElementById('list');
        this.bookForm = document.getElementById('bookForm');
        this.removeBtn = document.getElementById('btnBorrar');
        this.removeInput = document.getElementById('idLibro');
    }

    renderModulesInSelect(modules) {
        const select = document.getElementById('bookModule')
        select.innerHTML = ''
        modules.forEach(module => {
            const newOption = document.createElement('option')
            newOption.value = module.code
            newOption.textContent = `${module.cliteral} (${module.code})`
            select.append(newOption)
        })
    }

    renderBooks(books) {
  const listDiv = document.getElementById("list");
  listDiv.innerHTML = ""; 

 
  books.forEach(book => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.backgroundColor = "#ffb6c1";
    card.style.padding = "1em";
    card.style.margin = "1em";
    card.style.borderRadius = "10px";
    card.style.textAlign = "center";
    card.setAttribute("data-id", book.id);

    const vendido = book.soldDate
      ? book.soldDate
      : "En venta";

    card.innerHTML = `
      <h3>Libro ${book.id}</h3>
      <h4><strong>${book.moduleCode}</strong> (${book.id})</h4>
      <h4>${book.publisher}</h4>
      <p>${book.pages} páginas</p>
      <p>Estado: ${book.status}</p>
      <p>${vendido}</p>
      <p>${book.comments ? book.comments : ""}</p>
      <h4><strong>${book.price.toFixed(2)} €</strong></h4>
    `;

    listDiv.appendChild(card);
  });
}


    deleteBook(book) {
        const bookCard = this.booksList.querySelector(`[data-id="${book.id}"]`);
        if (bookCard) {
            this.booksList.removeChild(bookCard);
        }
    }

    renderMessage(type, message) {
        const newMessage = document.createElement('div')
        newMessage.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()">x</button>
        `
        this.messages.append(newMessage)
    }

    setBookSubmitHandler(callback) {  
        this.bookForm.addEventListener('submit', (event) => {
            event.preventDefault()
            // a continuación recoge los datos del formulario y los guarda en un objeto
            // por último llama a la función recibida pasándole dicho objeto
            const payload = {
                id: this.bookForm['idLibro'].value,
                title: this.bookForm['titulo'].value,
                author: this.bookForm['autor'].value,
                year: this.bookForm['anio'].value
            }
            callback(payload)
        })
    }

    setBookRemoveHandler(handleRemoveBook) {
        document.getElementById('btnBorrar').addEventListener('click', () => {
        const idToRemove = document.getElementById('idLibro').value
        handleRemoveBook(idToRemove)
    })
}

}