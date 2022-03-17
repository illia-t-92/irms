<template>    
    <v-container>
        <v-alert
            class="mt-n16"
            :value="alert.display"
            :type="alert.type"
            transition="fade-transition"
            dismissible
            >
            {{ alert.message }}
        </v-alert>
    </v-container>
</template>

<script>
export default {
    props: {
        message: {
            type: String
        },
        alertType: {
            type: String
        }
    }, 
    data: () => ({
        alert: {
            display: false,
        },
    }),
    methods: {
        show(message, type) {
            this.display = true
            this.message = message
            this.type = type
        },
        watch: {
        //watch for alert message to fade
        alert(new_val){
            if(new_val){
                setTimeout(()=>{this.alert.display=false},2000)
                }
            }   
        }   
    }
}
</script>