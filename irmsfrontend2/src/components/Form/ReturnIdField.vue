<template>
    <v-text-field
        v-model="return_id"
        label="Return ID"
        required
        :error-messages="returnIDErrors"
        @input="$v.return_id.$touch()"
        @blur="$v.return_id.$touch()"
    ></v-text-field>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, integer} from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],
    /*
    props: {
        addingRecord: Boolean,
    },
    */
    validations: {
        return_id: { required, integer },
    },
    data: () => ({
    }),
    computed: {
        return_id: {
            get () {
                return this.$store.state.form.item.return_id
            },
            set (value) {
                let payload = { field: 'return_id', value: value}
                this.$store.commit('form/changeFieldValue', payload)
            },
        addingRecord () {
            return this.$store.state.form.addingRecord
            }
        },
        returnIDErrors () {
            const errors = []
            if (!this.$v.return_id.$dirty) return errors
            !this.$v.return_id.required && errors.push('Return ID is required.')
            !this.$v.return_id.integer && errors.push('Return ID must be a number.')
            return errors
        },
    }
}
</script>