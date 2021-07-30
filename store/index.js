export const state = () => ({
  user: null,
  users: [],
  messages: [],
});

export const getters = {
  getUser: state => state.user,
  getUsers: state => state.users,
  getUserId: state => state.user?.id ?? null,
  getMessages: state => state.messages,
};

export const mutations = {
  setUser (state, user) {
    state.user = user;
  },
  clearData (state) {
    state.user = null;
    state.users = [];
    state.messages = [];
  },
  newMessage (state, message) {
    state.messages.push(message);
    // console.log(message);
  },
  updateUsers (state, users) {
    state.users = users;
  },
};

export const actions = {};
