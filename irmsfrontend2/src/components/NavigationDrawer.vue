<template>
    <v-navigation-drawer
        app
        v-model="drawerState"
        temporary
      >
        <MenuList/>
      </v-navigation-drawer>
</template>

<script>
import MenuList from '@/components/MenuList'


export default {
    components: {
        MenuList
    },
    /*
    data: () => ({
        drawer: null,
    }),
    */
    computed: {
      drawerState: {
        get () { return this.$store.getters.drawerState },
        set (v) { return this.$store.commit('toggleDrawerState', v) }
      }
    }
}
</script>
