<template>
    <v-text-field
        v-model="order_id"
        label="Order ID"
        required
        :error-messages="orderIDErrors"
        @input="$v.order_id.$touch()"
        @blur="$v.order_id.$touch()"
    ></v-text-field>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, integer} from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],
    props: {
        addingRecord: Boolean,
    },
    validations: {
        order_id: { required, integer },
    },
    data: () => ({
    }),
    computed: {
        order_id: {
            get () {
                return this.$store.state.form.item.order_id
            },
            set (value) {
                let payload = { field: 'order_id', value: value}
                this.$store.commit('form/changeFieldValue', payload)
            }
        },
        orderIDErrors () {
            const errors = []
            if (!this.$v.order_id.$dirty) return errors
            !this.$v.order_id.required && errors.push('Order ID is required.')
            !this.$v.order_id.integer && errors.push('Order ID must be a number.')
            return errors
        },
    }
}
</script>