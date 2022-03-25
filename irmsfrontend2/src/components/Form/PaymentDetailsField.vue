<template>
    <v-textarea
        rows="1"
        auto-grow
        label="Payment details"
        v-model="payment_details"
        required
        :error-messages="paymentDetailsErrors"
        @input="$v.payment_details.$touch()"
        @blur="$v.payment_details.$touch()"
    >
    
    </v-textarea>
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
        payment_details: { required },
    },
    data: () => ({
    }),
    computed: {
        payment_details: {
            get () {
                return this.$store.state.form.item.payment_details
            },
            set (value) {
                let payload = { field: 'payment_details', value: value}
                this.$store.commit('form/changeFieldValue', payload)
            },
        addingRecord () {
            return this.$store.state.form.addingRecord
            }
        },
        paymentDetailsErrors () {
            const errors = []
            if (!this.$v.payment_details.$dirty) return errors
            !this.$v.payment_details.required && errors.push('Payment details is required.')
            return errors
        },
    }
}
</script>