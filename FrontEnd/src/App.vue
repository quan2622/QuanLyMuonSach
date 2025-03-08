<script>
import { RouterView } from 'vue-router'
import AppHeader from "./components/partial/header.vue"
import AdminHeader from "./components/partial/Admin.header.vue"
import AdminSider from "./components/partial/Admin.Sider.vue"

export default {
  components: {
    AppHeader,
    AdminHeader,
    AdminSider,
  },
  computed: {
    currentHeader() {
      return this.$route.path.startsWith('/admin') ? "AdminHeader" : "AppHeader";
    }
  },
}
</script>

<template>
  <!-- <AppHeader></AppHeader> -->
   <div>
     <component :is="currentHeader"></component>
     <AdminSider></AdminSider>

     <RouterView/>
   </div>
</template>

<style scoped>

</style>

