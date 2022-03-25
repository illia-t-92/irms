<template>
<v-text-field
    v-model="customer_name"
    label="Customer Name"
    required
    :error-messages="customerNameErrors"
    @input="v$.customer_name.$touch()"
    @blur="v$.customer_name.$touch()"
></v-text-field>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
    validations () {
        return {
            customer_name: { required },
        }
    },
    setup: () => ({ v$: useVuelidate() }),
    computed: {
        customer_name: {
            get () {
                return this.$store.state.form.item.customer_name
            },
            set (value) {
                let payload = { field: 'customer_name', value: value}
                this.$store.commit('form/changeFieldValue', payload)
            },
        addingRecord () {
            return this.$store.state.form.addingRecord
            }
        },

        customerNameErrors () {
            return this.v$.customer_name.$errors.map(obj => obj.$message)
        },

    }
}
</script>