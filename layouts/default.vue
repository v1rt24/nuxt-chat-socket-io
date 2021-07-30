<template>
  <div class="container">
    <div class="row">

      <Sidebar/>

      <div class="col s11 offset-s1 customHeight">
        <Nuxt/>
      </div>

    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar';

export default {
  name: 'default',
  components: {Sidebar},
};
</script>

<style scoped>
.customHeight {
  height: 100vh;
}
</style>
