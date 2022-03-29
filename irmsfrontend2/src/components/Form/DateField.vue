<template>
    <v-menu
        v-model="dateMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
        >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="operation_date"
                label="Operation date"
                prepend-icon="mdi-calendar"
                readonly
                :error-messages="operationDateErrors"
                @input="v$.operation_date.$touch()"
                @blur="v$.operation_date.$touch()"
                v-bind="attrs"
                v-on="on"
                value = "" 
            ></v-text-field>
        </template>
        <v-date-picker
            v-model="operation_date"
            no-title
            scrollable
            @input="dateMenu = false"
        ></v-date-picker>
    </v-menu>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import moment from 'moment'

export default {
    validations () {
        return {
            operation_date: { required },
        }
    },
    setup: () => ({ v$: useVuelidate() }),
    data: () => ({
        dateMenu: false
    }),
    methods: {
        formatDate(value) {
            if(value) {
                return moment(String(value)).format('YYYY-MM-DD hh:mm:ss')
            }
        }
    },
    computed: {
        operation_date: {
            get () {
                let operation_date = this.$store.state.form.item.operation_date
                return this.formatDate(operation_date)
            },
            set (value) {
                let payload = { field: 'operation_date', value: this.formatDate(value)}
                this.$store.commit('form/changeFieldValue', payload)
            },
        addingRecord () {
            return this.store.state.form.addingRecord
            }
        },
        operationDateErrors () {
            return this.v$.operation_date.$errors.map(obj => obj.$message)
        },
    }
}
</script>