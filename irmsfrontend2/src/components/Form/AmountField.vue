<template>
    <v-text-field
        v-model="amount"
        label="Amount"
        required
        :error-messages="amountErrors"
        @input="v$.amount.$touch()"
        @blur="v$.amount.$touch()"
    ></v-text-field>
    <!--
        
    -->
</template>

<script>
import { required, decimal } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

export default {
    setup: () => ({ v$: useVuelidate() }),
    validations () {
        return {
            amount: { required, decimal },
        }
    },
    computed: {
        amount: {
            get () {
                return this.$store.state.form.item.amount
            },
            set (value) {
                let payload = { field: 'amount', value: value}
                this.$store.commit('form/changeFieldValue', payload)
            },
            addingRecord () {
                return this.$store.state.form.addingRecord
            }
        },
        amountErrors () {
            return this.v$.amount.$errors.map(obj => obj.$message)
        },
    }
}
</script>