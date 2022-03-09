<template>
<v-form v-model="isValid">
    <v-container>
        <v-alert
            class="mt-4"
            :value="alert.display"
            :type="alert.type"
            transition="fade-transition"
            dismissible
            >
            {{ alert.message }}
        </v-alert>
    </v-container>
    <v-container d-flex justify-space-around>
    <v-card
        class="mx-auto mt-8"
        elevation="5"
        min-width="400"
    >
        <v-card-title>Log in</v-card-title>
        <v-card-text>
            <v-form v-model="isValid">
                <v-text-field 
                    label="Username"
                    v-model="username"
                    :rules="usernameRule"
                    required
                >
                </v-text-field>
                <v-text-field
                    label="Password"
                    v-model="password"
                    type="password"
                    :rules="passwordRule"
                    required
                >
                </v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-col class="text-right">
                <v-btn 
                    color="primary"
                    :disabled="!isValid"
                    @click="submit"
                >
                Login
                </v-btn>
            </v-col>
        </v-card-actions>
    </v-card>
    </v-container>
</v-form>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Login',
    data: ()=> ({
        username: null,
        password: null,
        isValid: true,
        submitted: false,
        alert: {
            display: false,
            message: '',
            type: 'error',
        },
        usernameRule:[v => !!v || 'Email is required'],
        passwordRule:[v => !!v || 'Password is required'],
    }),
    methods: {
        async submit(isFormValid) {
        this.submitted = true
        this.errors = []
        if (isFormValid){
            axios.defaults.headers.common["Authorization"] = ""
            localStorage.removeItem("token")
            const formData = {
                username: this.username,
                password: this.password
            }
            await axios
                .post("/api/v1/token/login/", formData)
                .then(response => {
                    const token = response.data.auth_token
                    this.$store.commit('setToken', token)
                    
                    axios.defaults.headers.common["Authorization"] = "Token " + token
                    localStorage.setItem("token", token)
                    const toPath = this.$route.query.to || '/'
                    this.$router.push(toPath)
                })
                .catch(error => {
                    if (error.response) {
                            this.alert={
                                display: true,
                                message: error.response.data.non_field_errors[0],
                                type: 'error',
                            }
                    } else {                       
                        console.log(JSON.stringify(error))
                    }
                })
            }
        },
    },
    watch: {
        alert(new_val){
            if(new_val){
                setTimeout(()=>{this.alert.display=false},2000)
            }
        }   
    },
}
</script>