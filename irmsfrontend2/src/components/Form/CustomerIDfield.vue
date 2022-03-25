<template>
    <v-text-field
        v-model="customer_PID"
        label="Customer PID"
        required
        :error-messages="customerPIDErrors"
        @input="v$.customer_PID.$touch()"
        @blur="v$.customer_PID.$touch()"
    ></v-text-field>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'


export default {
    validations () {
        return {
            customer_PID: { required },
        }
    },
    setup: () => ({ v$: useVuelidate() }),
    computed: {
        customer_PID: {
            get () {
                return this.$store.state.form.item.customer_PID
            },
            set (value) {
                let payload = { field: 'customer_PID', value: value}
                this.$store.commit('form/changeFieldValue', payload)
            },
        addingRecord () {
            return this.$store.state.form.addingRecord
        }
        },

        customerPIDErrors () {
            return this.v$.customer_PID.$errors.map(obj => obj.$message)
        },

    }
}
</script>