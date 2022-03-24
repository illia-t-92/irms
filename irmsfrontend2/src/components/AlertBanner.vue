<template>    
    <v-container >
        <v-alert 
            v-for="message in alert.messages"
            :key="message"
            class="mt-4"
            :value="alert.status"
            :type="alert.type"
            transition="fade-transition"
            >
            {{ message }}
        </v-alert>
    </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    computed: {
          ...mapState('alert', {
            alert: state => state.alert,
        })
    },
    methods: {
        ...mapMutations({
            dismissAlert: 'alert/dismissAlert'
        })
    },
    watch: {
        //watch for alert message to fade
        alert() {
            setTimeout( this.dismissAlert, 2000)
        }
    }  
}
</script>