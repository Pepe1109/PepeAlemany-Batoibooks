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

        try {await Promise.all([
                this.users.populate(),
                this.books.populate(),
                this.modules.populate()
            ])
        } catch (error) {
            this.view.renderMessage('error', 'Error de BBDD: '+ error)
        }

        this.view.renderModulesInSelect(this.modules.data)
        this.view.renderBooks(this.books.data)

        this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this));
        this.view.setBookRemoveHandler(this.handleRemoveBook.bind(this));
    }

    handleSubmitBook(payload) {
        this.book(addDBBook(payload))
        renderBooks(books)
    }

    async handleRemoveBook(idToRemove) {
        try {
            await this.books.removeBook(idToRemove);
            this.view.removeBookFromList(idToRemove);
        } catch (error) {
            renderMessage('error', 'No se ha podido borrar el libro')
        }
    }


}