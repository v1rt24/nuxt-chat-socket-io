
// =============== Это БД чата

class Users {
  constructor () {
    this.users = [];
  }

  // Добавление пользователя
  add (user) {
    this.users.push(user);
  }

  // Получение одного пользователя
  get (id) {
    return this.users.find(el => el.id === id);
  }

  // Удаление пользователя
  remove (id) {
    const user = this.get(id);

    if (user) {
      this.users = this.users.filter(el => el.id !== id);
    }

    return user;
  }

  // Получение всех пользователей определённой комнаты
  getByRoom (room) {
    return this.users.filter(el => el.room === room);
  }
}

module.exports = function () {
  return new Users();
};
