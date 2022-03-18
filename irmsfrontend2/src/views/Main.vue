<template>
  <v-main>
      <NavigationDrawer/>
      <AppBar/>
      <AlertBanner/>
        <v-main fluid>
          <router-view></router-view>
        </v-main>
        <!--
        <v-footer padless>
        </v-footer>
        -->
  </v-main>
</template>

<script>
import AppBar from '@/components/AppBar'
import NavigationDrawer from '@/components/NavigationDrawer'
import AlertBanner from '@/components/AlertBanner'

  export default {
    name: 'Home',
    components:{
      AppBar,
      NavigationDrawer,
      AlertBanner
    },
  }
</script>
