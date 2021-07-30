<template>
  <ul class="collection sidenav sidenav-fixed">
    <li class="collection-item">
      <button class="waves-effect waves-light btn-small" @click="exit">Выход</button>
    </li>
    <li class="collection-item">
      <span class="title">Список людей в комнате: {{ users.length }}</span>
    </li>
    <li
      v-for="u in users"
      :key="u.id"
      class="collection-item"
    >
      <span class="title">{{ u.name }}</span>
      <div class="secondary-content circleSignal" :class="u.id === user.id ? 'active' : 'noActive'"></div>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Sidebar',
  data: () => ({
    socket: null,
  }),
  computed: {
    ...mapGetters({
      user: 'getUser',
      users: 'getUsers',
    }),
  },
  methods: {
    ...mapMutations(['clearData']),
    exit () {
      // Выход из чата
      this.socket.emit('userExit', this.user.id, data => {
        this.clearData();
        this.$router.push('/?message=exit');
      });
    },
  },
  mounted () {
    // Переиспользуем сокет по метке. Он объявлен в "pages/index.vue"
    this.socket = this.$nuxtSocket({
      persist: 'mySocket',
    });
  },
};
</script>

<style scoped>
.circleSignal {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.active {
  background-color: #0f9d58;
}

.noActive {
  background-color: #b4b4b4;
}
</style>
