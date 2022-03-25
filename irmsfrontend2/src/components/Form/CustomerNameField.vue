<template>
<v-text-field
    v-model="customer_name"
    label="Customer Name"
    required
    :error-messages="customerNameErrors"
    @input="$v.customer_name.$touch()"
    @blur="$v.customer_name.$touch()"
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
        customer_name: { required },
    },
    data: () => ({
    }),
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
            const errors = []
            if (!this.$v.customer_name.$dirty) return errors
            !this.$v.customer_name.required && errors.push('Name is required.')
            return errors
        },
    }
}
</script>