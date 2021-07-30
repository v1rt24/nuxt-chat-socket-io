<template>
  <div>
    <div v-if="name === 'admin'" class="system">
      <p class="center">{{ text }}</p>
      <hr>
    </div>

    <div v-else class="wrap">
      <div :class="['message', {owner}]">
        <small><strong>{{ name }}</strong></small>
        <p>{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    name: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    owner: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.system {
  margin-bottom: 1rem;
}

.system p {
  margin-bottom: 1rem;
}

.wrap {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.message {
  position: relative;
  width: 60%;
  padding: 1rem;
  margin: 0 1rem;
  box-shadow: 0 1px 0 0 rgba(50, 50, 50, .3);
  border-radius: 4px;
  background-color: #00b0ff;
}

.message p {
  margin-bottom: 0;
}

.owner {
  background-color: #f7f7f7;
  color: black;
  align-self: flex-end;
}
</style>
