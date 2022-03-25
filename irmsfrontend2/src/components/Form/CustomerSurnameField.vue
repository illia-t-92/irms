<template>
<v-text-field
    v-model="customer_surname"
    label="Customer Surname"
    required
    :error-messages="customerSurnameErrors"
    @input="$v.customer_surname.$touch()"
    @blur="$v.customer_surname.$touch()"
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
        customer_surname: { required },
    },
    data: () => ({
    }),
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
            const errors = []
            if (!this.$v.customer_surname.$dirty) return errors
            !this.$v.customer_surname.required && errors.push('Surname is required.')
            return errors
        },
    }
}
</script>