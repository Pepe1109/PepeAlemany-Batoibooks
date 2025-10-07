import User from "./user.class.js";

export default class Users {
  constructor() {
    this.data = [];
  }

  populate(users) {
    this.data = users.map(u => new User(u.id, u.nick, u.email, u.password));
  }

  addUser(userData) {
    const newId = this.data.reduce((max, u) => Math.max(max, u.id), 0) + 1;
    const newUser = new User(newId, userData.nick, userData.email, userData.password);
    this.data.push(newUser);
    return this.data[this.data.length - 1];
  }

  removeUser(userId) {
    const index = this.getUserIndexById(userId);
    this.data.splice(index, 1);
  }

  changeUser(userData) {
    const index = this.getUserIndexById(userData.id);
    this.data[index] = new User(userData.id, userData.nick, userData.email, userData.password);
    return this.data[index];
  }

  getUserById(userId) {
    const user = this.data.find(u => u.id === userId);
    if (!user) throw new Error("User not found");
    return user;
  }

  getUserIndexById(userId) {
    const index = this.data.findIndex(u => u.id === userId);
    if (index === -1) throw new Error("User not found");
    return index;
  }

  getUserByNickName(nick) {
    const user = this.data.find(u => u.nick === nick);
    if (!user) throw new Error("User not found");
    return user;
  }

  toString() {
    return this.data.map(u => u.toString()).join("\n");
  }
}
