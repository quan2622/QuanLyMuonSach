<script>
import { RouterView } from 'vue-router'
import AppHeader from "./components/partial/header.vue"
export default {
  components: {
    AppHeader,
  }
}
</script>

<template>
  <AppHeader></AppHeader>
  <RouterView/>
</template>

<style scoped>

</style>

