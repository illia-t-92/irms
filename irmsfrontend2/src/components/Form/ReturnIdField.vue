<template>
    <v-text-field
        v-model="return_id"
        label="Return ID"
        required
        :error-messages="returnIDErrors"
        @input="v$.return_id.$touch()"
        @blur="v$.return_id.$touch()"
    ></v-text-field>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, integer} from '@vuelidate/validators'

export default {
    validations () {
        return {
            return_id: { required, integer },
        }
    },
    setup: () => ({ v$: useVuelidate() }),
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
            return this.v$.return_id.$errors.map(obj => obj.$message)
        },

    }
}
</script>