<template>
    <v-select
        v-model="status"
        :items="statusChoices"
        item-text="statusText"
        item-value="statusKey"
        label="Status"
        attach
        chips
        :error-messages="statusErrors"
        @input="v$.status.$touch()"
        @blur="v$.status.$touch()"
    >
    </v-select>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
    validations () {
        return {
            status: { required },
        }
    },
    setup: () => ({ v$: useVuelidate() }),
    data: () => ({
            statusChoices: [
                    {
                        statusKey: "NEW",
                        statusText: "New"
                    }, 
                    {
                        statusKey: "OK",
                        statusText: "Proceed"
                    }, 
                    {
                        statusKey: "CHECK",
                        statusText: "Check"
                    }, 
                    { 
                        statusKey: "PAID",
                        statusText: "Paid"
                    }, 
                    {
                        statusKey: "REVIEW",
                        statusText: "Review"
                    }, 
                    {
                        statusKey: "BLOCK",
                        statusText: "Block"
                    }
                ],
        }),
        methods: {

        },
        computed: {
            status: {
                get () {
                    return this.$store.state.form.item.status
                },
                set (value) {
                    let payload = { field: 'status', value: value}
                    this.$store.commit('form/changeFieldValue', payload)
                },
            addingRecord () {
                return this.$store.state.form.addingRecord
                }
            },
            statusErrors () {
                return this.v$.status.$errors.map(obj => obj.$message)
            },
        },
}
</script>