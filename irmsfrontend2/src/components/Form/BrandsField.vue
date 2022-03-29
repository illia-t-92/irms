<template>
    <v-row align="center">
        <v-col
            class="d-flex"
            cols="12"
        >
            <v-select
            v-model="brand"
            :items="brands"
            item-text="name"
            item-value="code"
            label="Brand"
            :readonly="!addingRecord"
            :disabled="!addingRecord"
            :error-messages="brandErrors"
            @input="v$.brand.$touch()"
            @blur="v$.brand.$touch()"
            ></v-select>
        </v-col>
    </v-row>
</template>

<script>
import axios from 'axios'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
    validations () {
        return {
            brand: { required },
        }
    },
    setup: () => ({ v$: useVuelidate() }),
    data: () => ({
        brands: [],
    }),
    methods: {
        async loadBrandsList(){
            await axios.get('/api/v1/brands-short/')
            .then(response =>{
                this.brands=response.data
            })
            .catch(error =>{
                console.log(error)
            })
        },
    },
    computed: {
        brand: {
            get () {
                return this.$store.state.form.item.brand
            },
            set (value) {
                this.$store.commit('form/changeFieldValue', { 
                    field: 'brand', 
                    value: this.brands.find(({code}) => code === value) 
                })
            },
        },   
        addingRecord () {
            return this.$store.state.form.addingRecord
        },
        brandErrors () {
            return this.v$.brand.$errors.map(({$message}) => $message)
        },
    },
    created () {
        this.loadBrandsList()
    },
}
</script>