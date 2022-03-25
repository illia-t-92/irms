<template>
    <v-text-field
        v-model="customer_PID"
        label="Customer PID"
        required
        :error-messages="customerPIDErrors"
        @input="$v.customer_PID.$touch()"
        @blur="$v.customer_PID.$touch()"
    ></v-text-field>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],
    /*
    props: {
        addingRecord: Boolean,
    },
    */
    validations: {
        customer_PID: { required },
    },
    data: () => ({
    }),
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
            const errors = []
            if (!this.$v.customer_PID.$dirty) return errors
            !this.$v.customer_PID.required && errors.push('Customer PID is required.')
            return errors
        },
    }
}
</script>