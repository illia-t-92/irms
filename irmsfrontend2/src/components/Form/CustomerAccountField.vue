<template>
    <v-text-field
        v-model="customer_account"
        label="Customer Account"
        required
        :error-messages="customerAccountErrors"
        @input="v$.customer_account.$touch()"
        @blur="v$.customer_account.$touch()"
    ></v-text-field>
</template>

<script>
import { required, maxLength, minLength } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

export default {
    validations () {
        return {
            customer_account: { required, minLength: minLength(20), maxLength: maxLength(32) },
        }
    },
    setup: () => ({ v$: useVuelidate() }),
    computed: {
        customer_account: {
            get () {
                return this.$store.state.form.item.customer_account
            },
            set (value) {
                let payload = { field: 'customer_account', value: value}
                this.$store.commit('form/changeFieldValue', payload)
            },
        addingRecord () {
            return this.$store.state.form.addingRecord
            }
        },
        customerAccountErrors () {
            return this.v$.customer_account.$errors.map(obj => obj.$message)
        },
    }
}
</script>