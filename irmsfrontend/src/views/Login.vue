Login.vue:
<template>
<form @submit.prevent="handleSubmit(!v$.$invalid)">
    <transition-group name="p-message" tag="div">
        <Message v-for="error in errors" :severity="error.severity" :key="error.id">{{error.content}}</Message>
    </transition-group>
    <div class="p-fluid p-ai-center vertical-container">
        <div class="p-field p-grid p-jc-center">
            <div class="p-col-5 p-md-4">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-user"></i>
                    </span>
                    <span class="p-float-label">
                        <InputText id="username" type="text" v-model="v$.username.$model" :class="{'p-invalid':v$.username.$invalid && submitted}" />
                        <label for="username" :class="{'p-error':v$.username.$invalid && submitted}">Username</label>
                    </span>
                </div>
                <small v-if="(v$.username.$invalid && submitted) || v$.username.$pending.$response" class="p-error">{{v$.username.required.$message.replace('Value', 'Username')}}</small>
                
            </div>
        </div>
        <div class="p-field p-grid p-jc-center">
            <div class="p-col-5 p-md-4">
                <span class="p-float-label">
                    <Password id="password" type="password" v-model="v$.password.$model" :class="{'p-invalid':v$.password.$invalid && submitted}" :feedback="false" toggleMask />
                    <label for="password" :class="{'p-error':v$.password.$invalid && submitted}">Password</label>
                </span>
                <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="p-error">{{v$.password.required.$message.replace('Value', 'Password')}}</small>
            </div>
        </div>
        <div class="p-field p-grid p-jc-center">
            <div class="p-col-5 p-md-4">
                <Button label="Log in" type="submit"/>
            </div>
        </div>
    </div>
</form>
</template>

<script>

import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message';
import axios from 'axios'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
    name:'Login',
    components:{
        InputText,
        Password,
        Button,
        Message,
    },
    setup () {
        return {
        v$: useVuelidate()
        }
    },
    data(){
        return {
        username:'',
        password:'',
        submitted: false,
        errors: [],
        error_count: 0,
        }
    },
    validations () {
        return {
            username: { required },
            password: { required }
        }
    },
    methods: {
    async handleSubmit(isFormValid) {
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
        addMessages(property) {
                this.errors.push(
                    {severity: 'error', content: property, id: this.error_count++}
                    )
            }
    }
}
</script>

<style scoped>
.vertical-container {
    padding-top: 10rem;
    padding-bottom: 15rem;
    padding-left: 15rem;
    padding-right: 15rem;
}
</style>