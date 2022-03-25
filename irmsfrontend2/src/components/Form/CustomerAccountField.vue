<template>
    <v-text-field
        v-model="customer_account"
        label="Customer Account"
        required
        :error-messages="customerAccountErrors"
        @input="$v.customer_account.$touch()"
        @blur="$v.customer_account.$touch()"
    ></v-text-field>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength } from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],
    /*
    props: {
        addingRecord: Boolean,
    },
    */
    validations: {
        customer_account: { required, minLength: minLength(20), maxLength: maxLength(32) },
    },
    data: () => ({
    }),
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
            const errors = []
            if (!this.$v.customer_account.$dirty) return errors
            !this.$v.customer_account.maxLength && errors.push('Account number may have up to 30 characters long')
            !this.$v.customer_account.minLength && errors.push('Account number must be at least 20 characters long')
            !this.$v.customer_account.required && errors.push('Order ID is required.')
            return errors
        },
    }
}
</script>