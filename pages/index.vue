<template>
  <div class="row">
    <form class="col s6 offset-s3" @submit.prevent="goInHandler">
      <h4>Чат</h4>
      <div class="row">
        <div class="input-field col s12">
          <input
            id="name"
            type="text"
            v-model.trim="formData.name"
            :class="{invalid: $v.formData.name.$dirty && !$v.formData.name.required}"
          >
          <label for="name">Ваше имя</label>
          <span
            v-if="$v.formData.name.$dirty && !$v.formData.name.required"
            class="helper-text"
          >
            Введите имя
          </span>
        </div>

        <div class="input-field col s12">
          <input
            id="room"
            type="text"
            v-model.trim="formData.room"
            :class="{invalid: $v.formData.room.$dirty && !$v.formData.room.required}"
          >
          <label for="room">Введите комнату</label>
          <span
            v-if="$v.formData.room.$dirty && !$v.formData.room.required"
            class="helper-text"
          >
            Введите комнату
          </span>
        </div>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Войти
      </button>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapMutations } from 'vuex';

export default {
  name: 'index',
  layout: 'empty',
  head: {
    title: 'Вход в чат',
  },
  data: () => ({
    formData: {
      name: '',
      room: '',
    },
    socket: null,
  }),
  validations: {
    formData: {
      name: {required},
      room: {required},
    },
  },
  methods: {
    ...mapMutations(['setUser']),
    goInHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const user = {...this.formData};

      this.socket.emit('userData', user, data => {
        if (typeof data === 'string') {
          console.error(data);
        }
        else {
          user.id = data.userId;
          this.setUser(user);

          this.$router.push('/chat');
        }
      });
    },
  },
  mounted () {
    this.socket = this.$nuxtSocket({
      name: 'home',
      channel: '/',
      reconnection: false,
      persist: 'homeSocket', // указываем метку для переиспользования сокета
      vuex: {
        mutations: ['newMessage', 'updateUsers'],
      },
    });
  },
};
</script>

<style scoped>

</style>
