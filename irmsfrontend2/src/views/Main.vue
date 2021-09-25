<template>
  <v-main>
      <v-navigation-drawer
        v-model="drawer"
        app
      >
        <MenuList :menuItems="items"
                  title="Returns manager"
                  subtitle="Menu"
        />
      </v-navigation-drawer>
      <v-app-bar app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Menu</v-toolbar-title>

        <v-btn color="error" 
          absolute
          right
          @click="logout()"
        >
          Logout
        </v-btn>
      </v-app-bar>

        <v-main fluid>
          <router-view></router-view>
        </v-main>
        <!--
        <v-footer padless>
          <v-col
            class="text-center"
            cols="12"
          >
            {{ new Date().getFullYear() }} — <strong>Returns Manager</strong>
          </v-col>
        </v-footer>
        -->
  </v-main>
</template>

<script>
import MenuList from '@/components/MenuList'
import axios from 'axios'

  export default {
    name: 'Home',
    components:{
      MenuList,
    },
    data: () => ({
      drawer: false,
      items: [
        {
          key: '1',
          icon: 'mdi-home',
          title: 'Home',
          route: '/home'
        },
        {
          key: '2',
          icon: 'mdi-information',
          title: 'About',
          route: '/About'
        },
        {
          key: '3',
          icon: 'mdi-view-list',
          title: 'Returns list',
          route: '/returns-list'
        }
        
      ]
    }),
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
