<template>
  <div class="row">
    <div class="input-field col s12">
          <textarea
            id="textarea1"
            class="materialize-textarea"
            v-model.trim="text"
            @keydown.ctrl.enter="sendHandler"
          ></textarea>
      <label for="textarea1">Введите сообщение</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatForm',
  data: () => ({
    text: '',
    socket: null, // переменная для сокета
  }),
  methods: {
    sendHandler () {
      // Создаём событие, передаём данные и функцию обратного вызова
      this.socket.emit('createMessage', {
        id: this.$store.getters['getUserId'],
        text: this.text,
      }, data => {
        if (typeof data === 'string') {
          console.error(data);
        }
        else {
          this.text = '';
        }
      });
    },
  },
  mounted () {
    // Повторное использование/переиспользование сокета
    this.socket = this.$nuxtSocket({
      persist: 'homeSocket',
    });
  },
};
</script>

<style scoped>

</style>
