<template>
    <v-card 
        class="mx-auto my-auto"
        elevation="5"
        min-width="400"
    >
        <v-card-title>Please, login</v-card-title>
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
        errors: [],
        error_count: 0,
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
                        for (const property in error.response.data) {
                            this.errors.push({
                                severity:'error',
                                content: `${error.response.data[property]}`,
                                id: this.error_count++
                            })
                        }
                    } else {
                        this.errors.push('Something went wrong. Please try again')
                        
                        console.log(JSON.stringify(error))
                    }
                })
            }
        },
    }
    
}
</script>