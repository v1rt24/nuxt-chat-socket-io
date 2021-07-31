<template>
  <div class="c-wrap">
    <div class="c-chat" ref="block">
      <Message
        v-for="(message, idx) in messages"
        :key="idx"
        :name="message.name"
        :text="message.text"
        :owner="message.id === user.id"
      />
    </div>

    <div class="c-form">
      <ChatForm/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Message from '~/components/Message';
import ChatForm from '~/components/ChatForm';

export default {
  name: 'chat',
  middleware: ['chat'],
  head () {
    return {
      title: `Комната ${this.user?.room}`,
    };
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
      messages: 'getMessages',
    }),
  },
  components: {ChatForm, Message},
  watch: {
    messages () {
      // При добавлении сообщения делаем скролл вниз
      this.$nextTick(() => {
        this.$refs.block.scrollTop = this.$refs.block.scrollHeight;
      });
    },
  },
};
</script>

<style scoped>
.c-wrap {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.c-form {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 80px;
  background-color: #ffffff;
  padding: 1rem;
}

.c-chat {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 80px;
  padding: 1rem;
  overflow-y: auto;
}
</style>
