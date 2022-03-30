<template>
  <div>
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
  </div>
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
