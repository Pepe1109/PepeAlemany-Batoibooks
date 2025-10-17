import User from "./user.class.js";
import {
  getDBUsers,
  addDBUser,
  removeDBUser,
  changeDBUser,
  changeDBUserPassword,
  getUserById,
  getUserIndexById,
  getUserByNickName,
} from "../services/api.js";

export default class Users {
  constructor() {
    this.data = [];
  }

  async populate() {
    const users = await getDBUsers();
    this.data = users.map(u => new User(u.id, u.nick, u.email, u.password));
  }

  async addUser(userData) {
    const added = await addDBUser(userData);
    const newUser = new User(added.id, added.nick, added.email, added.password);
    this.data.push(newUser);
    return newUser;
  }

  async removeUser(userId) {
    await removeDBUser(userId);
    this.data = this.data.filter(u => u.id !== userId);
  }

  async changeUser(userData) {
    const updated = await changeDBUser(userData);
    const index = this.data.findIndex(u => u.id === updated.id);
    if (index === -1) throw new Error("User not found");
    this.data[index] = new User(updated.id, updated.nick, updated.email, updated.password);
    return this.data[index];
  }

  async changeUserPassword(userId, newPassword) {
    const updated = await changeDBUserPassword(userId, newPassword);
    const index = this.data.findIndex(u => u.id === userId);
    if (index === -1) throw new Error("User not found");
    this.data[index].password = updated.password;
    return this.data[index];
  }

  // Métodos locales reutilizando tus funciones
  getUserById(userId) {
    return getUserById(this.data, userId);
  }

  getUserIndexById(userId) {
    return getUserIndexById(this.data, userId);
  }

  getUserByNickName(nick) {
    return getUserByNickName(this.data, nick);
  }

  toString() {
    return this.data.map(u => u.toString()).join("\n");
  }
}
