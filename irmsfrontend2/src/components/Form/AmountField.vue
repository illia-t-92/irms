<template>
    <v-text-field
        v-model="amount"
        label="Amount"
        required
        :error-messages="amountErrors"
        @input="$v.amount.$touch()"
        @blur="$v.amount.$touch()"
    ></v-text-field>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, decimal } from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],
    props: {
        addingRecord: Boolean,
    },
    validations: {
        amount: { required, decimal },
    },
    data: () => ({
    }),
    computed: {
        amount: {
            get () {
                return this.$store.state.form.item.amount
            },
            set (value) {
                let payload = { field: 'amount', value: value}
                this.$store.commit('form/changeFieldValue', payload)
            }
        },
        amountErrors () {
        const errors = []
        if (!this.$v.amount.$dirty) return errors
            !this.$v.amount.required && errors.push('Please, enter return amount.')
            !this.$v.amount.decimal && errors.push('Amount must be a number.')
        return errors
        },
    }
}
</script>