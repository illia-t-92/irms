<template>
    <v-textarea
        rows="1"
        auto-grow
        label="Payment details"
        v-model="payment_details"
        required
        :error-messages="paymentDetailsErrors"
        @input="v$.payment_details.$touch()"
        @blur="v$.payment_details.$touch()"
    >
    </v-textarea>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
    validations() {
        return {
            payment_details: { required },
        }
    },
    setup: () => ({ v$: useVuelidate() }),
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
            return this.v$.payment_details.$errors.map(obj => obj.$message)
        },
    }
}
</script>