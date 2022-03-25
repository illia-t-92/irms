<template>
    <v-text-field
        v-model="order_id"
        label="Order ID"
        required
        :error-messages="orderIDErrors"
        @blur="v$.order_id.$touch()"
        @input="v$.order_id.$touch()"
    >
    </v-text-field>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, integer} from '@vuelidate/validators'

export default {
    validations () {
        return {
            order_id: { required, integer },
        }
    },
    setup: () => ({ v$: useVuelidate() }),
    computed: {
        order_id: {
            get () {
                return this.$store.state.form.item.order_id
            },
            set (value) {
                let payload = { field: 'order_id', value: value}
                this.$store.commit('form/changeFieldValue', payload)
            },
        addingRecord () {
            return this.$store.state.form.addingRecord
            }
        },
        orderIDErrors () {
            return this.v$.order_id.$errors.map(obj => obj.$message)
        },
    }
}
</script>