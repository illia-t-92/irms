<template>
  <div id="nav">
    <Menubar :model="items">
      <template #start>
          <strong>Returns manager</strong>
      </template>
      <template>
        <Button icon="pi pi-bars" />
      </template>
      <template #end>
      <template v-if="$store.state.isAuthenticated">
         <Button label="Log out" class="p-button-secondary" icon="pi pi-sign-out" type="button" @click="logout()"/>
      </template> 
      </template>
    </Menubar>
  </div>
</template>

<script>
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'
import axios from 'axios'
export default {
  components:{
    Menubar,
    Button
  },
  data(){
    return {
      items: [
        {
          label:'Home',
          icon: 'pi pi-fw pi-home',
          to: '/'
        },
        {
          label:'Returns list',
          icon: 'pi pi-fw pi-list',
          to: '/records-list',
        },
        {
          label: 'Add manual return',
          icon: 'pi pi-fw pi-plus'
        },
        {
          label:'About',
          to: '/about'
        },

      ],
      showSidebar: false,
    }
  },
  methods: {
    logout() {
        axios.defaults.headers.common["Authorization"] = ""
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("userid")
        this.$store.commit('removeToken')
        this.$router.push('login')
    },
    
  }
}
</script>
<style lang="scss">

</style>

