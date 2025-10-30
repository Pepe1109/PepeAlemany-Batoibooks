import View from '../view/view.class';
import Users from '../model/users.class';
import Books from '../model/books.class';
import Modules from '../model/modules.class';
import { addDBBook } from '../services/api';

export default class Controller {
    constructor() {
        this.view = new View()
        this.users = new Users()
        this.books = new Books()
        this.modules = new Modules()
    }

    async init() {
        console.log("🟢 Controller iniciado");
        try {
            await Promise.all([
                this.users.populate(),
                this.books.populate(),
                this.modules.populate()
            ])
            console.log("🟢 Datos cargados:", this.books.data.length, "libros");
            console.log(this.books.data)
            console.log(document.getElementById('list'))


            this.view.renderModulesInSelect(this.modules.data)
            this.view.renderBooks(this.books.data)

            this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this))
            this.view.setBookRemoveHandler(this.handleRemoveBook.bind(this))

        } catch (error) {
            this.view.renderMessage('error', 'Error cargando datos: ' + error)
        }
    }

    async handleSubmitBook(payload) {
        try {
            const newBook = await this.books.addBook(payload)
            this.view.renderBooks(this.books.data)
            this.view.renderMessage('info', 'Libro añadido correctamente')
        } catch (error) {
            this.view.renderMessage('error', 'Error al añadir el libro: ' + error.message)
        }
    }

    async handleRemoveBook(idToRemove) {
        try {
            await this.books.removeBook(idToRemove)
            this.view.renderBooks(this.books.data) 
            this.view.renderMessage('info', `Libro ${idToRemove} eliminado correctamente`)
        } catch (error) {
            this.view.renderMessage('error', 'No se ha podido borrar el libro: ' + error.message)
        }
    }
}