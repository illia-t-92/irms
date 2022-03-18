<template>    
    <v-container>
        <v-alert
            class="mt-n16"
            :value="alert.status"
            :type="alert.type"
            transition="fade-transition"
            dismissible
            >
            {{ alert.message }}
        </v-alert>
    </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    methods: {
        ...mapMutations({
            showAlert: 'showAlert',
            dismissAlert: 'dismissAlert'
      }),
    computed: mapState ({
        alert: 'alert'
    }),   
    }
}
</script>