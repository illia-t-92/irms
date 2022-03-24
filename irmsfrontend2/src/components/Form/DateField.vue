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
                v-bind="attrs"
                v-on="on"
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
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import moment from 'moment'

export default {
    mixins: [validationMixin],
    props: {
        addingRecord: Boolean,
    },
    validations: {
        operation_date: { required },
    },
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
                let payload = { field: 'operation_date', value: value}
                this.$store.commit('form/changeFieldValue', payload)
            }
        },
        operationDateErrors () {
            const errors = []
                if (!this.$v.operation_date.$dirty) return errors
                !this.$v.operation_date.required && errors.push('Operation date is required.')
            return errors
        },
    }
}
</script>