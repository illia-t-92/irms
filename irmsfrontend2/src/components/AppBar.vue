<template>
    <v-app-bar app>
        <v-app-bar-nav-icon @click="drawerState=!drawerState"></v-app-bar-nav-icon>
        <v-toolbar-title>Menu</v-toolbar-title>

        <v-btn color="error" 
          absolute
          right
          @click="logout()"
        >
          Logout
        </v-btn>
      </v-app-bar>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'

  export default {
    methods: {

      logout() {
        axios.defaults.headers.common["Authorization"] = ""
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("userid")
        this.$store.commit('removeToken')
        this.$router.go('login')
    },
      ...mapMutations({
        toogleDrawer: 'toogleDrawer'
      }),
    },
    computed: {
      drawerState: {
        get () { return this.$store.getters.drawerState },
        set (v) { return this.$store.commit('toggleDrawerState', v) }
      }
    }
  }
</script>