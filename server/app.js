const app = require('express')();
const server = require('http').createServer(app);
const users = require('./users')();

// Вариант не используя cors
const {Server} = require('socket.io');
const io = new Server(server);

// Вариант используя cors
/*const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});*/

// Функция, которая возвращает объект с пришедших данных
const m = (name, text, id) => ({name, text, id});

// Соединение с сокетом
io.on('connection', socket => {
  console.log('Подключение Сокета на сервере');

  socket.on('userData', (data, callback) => {
    if (!data.name || !data.room) {
      return callback('Данные некорректны');
    }

    // Добавляем пользователя в комнату. Параметром передаём номер комнаты
    socket.join(data.room);

    // Добавляем пользователя
    users.remove(socket.id);

    users.add({
      id: socket.id,
      name: data.name,
      room: data.room,
    });

    // Отправляем клиенту id, которе создал сокет
    callback({userId: socket.id});

    // Обновляем данные на клиенте только в определённой комнате
    // data.room - находится номер комнату, к примеру 10
    io.to(data.room).emit('updateUsers', users.getByRoom(data.room));

    // Отправляем событие, которое вызовет метод в Vuex.
    // Название события должно совпадать с названием метода в Vuex
    // В данном случаи событие 'newMessage' совпадает с методом в Vuex в mutations
    socket.emit('newMessage', m('admin', `Добро пожаловать ${data.name}`));

    // Отправляем сообщение всем пользователя которые находятся в этой комнате,
    // кроме текущего broadcast - исключает текущего пользователя Параметром
    // передаём номер комнаты data.room - находится номер комнаты
    socket.broadcast.to(data.room).emit('newMessage', m('admin', `Пользователь ${data.name} вошёл`));
  });

  // Создание нового сообщения
  socket.on('createMessage', (data, callback) => {
    if (!data.text) {
      return callback('Введите сообщение');
    }

    // Отправляем сообщение всем пользователям данной комнаты
    const user = users.get(data.id);

    if (user) {
      io.to(user.room).emit('newMessage', m(user.name, data.text, data.id));
      callback(user);
    }
  });

  // Выход из чата
  socket.on('userExit', (id, callback) => {
    // удаляем пользователя и возвращается его объект
    const user = users.remove(id);

    //
    if (user) {
      // Обновляем данные на клиенте
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room));

      // Отправляем сообщение. Отправляем в метод Vuex
      io.to(user.room).emit('newMessage', m('admin', `Пользователь ${user.name} вышел`));
    }

    //
    callback()
  });

  // Когда пользователь не вышел, а закрыл вкладку в браузере
  socket.on('disconnect', () => {
    // Удаляем пользователя. В user возвратится удалённый объект пользователя
    const user = users.remove(socket.id);

    if (user) {
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room));
      io.to(user.room).emit('newMessage', m('admin', `Пользователь ${user.name} вышел`));
    }
  });
});

module.exports = {
  app,
  server,
};
