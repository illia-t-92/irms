<template>
<v-text-field
    v-model="customer_surname"
    label="Customer Surname"
    required
    :error-messages="customerSurnameErrors"
    @input="v$.customer_surname.$touch()"
    @blur="v$.customer_surname.$touch()"
></v-text-field>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
    validations () {
        return {
            customer_surname: { required },
        }
    },
    setup: () => ({ v$: useVuelidate() }),
    computed: {
        customer_surname: {
            get () {
                return this.$store.state.form.item.customer_surname
            },
            set (value) {
                let payload = { field: 'customer_surname', value: value}
                this.$store.commit('form/changeFieldValue', payload)
            },
        addingRecord () {
            return this.$store.state.form.addingRecord
            }
        },

        customerSurnameErrors () {
            return this.v$.customer_surname.$errors.map(obj => obj.$message)
        },

    }
}
</script>