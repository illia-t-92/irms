<template>
    <v-card
        class="mx-auto"
        color="white"
        max-width="900"
    >
        <v-container d-flex justify-space-around>
            <v-form
                :disabled="!isEditing && !addingRecord"
                @submit.prevent="submit"
            >
                <BrandsField/>
                <v-row align="center">
                    <v-col class="d-flex" cols="4">
                        <ReturnIdField/>
                    </v-col>
                    <v-col class="d-flex" cols="4">
                        <OrderIdField/>
                    </v-col>
                    <v-col class="d-flex" cols="4">
                        <DateField />
                    </v-col>
                </v-row>
                <v-row align="center">
                    <v-col class="d-flex" cols="4">
                        <CustomerNameField />
                    </v-col>
                    <v-col class="d-flex" cols="4">
                        <CustomerSurnameField />
                    </v-col>
                    <v-col class="d-flex" cols="4">
                        <CustomerIDfield />
                    </v-col>
                </v-row>
                <v-row align="center">
                    <v-col class="d-flex" cols="8">
                        <CustomerAccountField />
                    </v-col>
                    <v-col class="d-flex" cols="4">
                        <AmountField />
                    </v-col>
                </v-row>
                <v-row align="center">
                    <v-col class="d-flex" cols="12">
                        <PaymentDetailsField />
                    </v-col>
                </v-row>
                <v-row align="center">
                    <v-col class="d-flex" cols="4">
                        <StatusField />
                    </v-col>
                </v-row>
                <v-row align="center">
                    <v-col class="d-flex" cols="12">
                        <CommentsField />
                    </v-col>
                </v-row>
                <v-row>
                    <div v-if="!isEditing && !addingRecord">
                        <v-btn class="ml-2 mb-2" color="warning" @click="isEditing=true">
                        <v-icon left> mdi-pencil </v-icon>
                            Edit
                        </v-btn>
                        <v-btn class="ml-2 mb-2" @click="returnToList()">
                        <v-icon left> mdi-arrow-left </v-icon>
                            Back
                        </v-btn>
                    </div>
                    <div v-else>
                        <v-btn class="ml-2 mb-2" color="success" @click="submitForm()">
                        <v-icon left> mdi-check</v-icon>
                            Save
                        </v-btn>
                        <v-btn class="ml-2 mb-2" color="error" @click="cancelEdit()">
                        <v-icon left> mdi-cancel</v-icon>
                            Cancel
                        </v-btn>
                    </div>
                </v-row>
            </v-form>
        </v-container>
    </v-card>
</template>

<script>
import axios from 'axios'
import { useVuelidate } from '@vuelidate/core'
import BrandsField from '@/components/Form/BrandsField'
import ReturnIdField from '@/components/Form/ReturnIdField'
import OrderIdField from '@/components/Form/OrderIdField'
import DateField from '@/components/Form/DateField'
import CustomerNameField from '@/components/Form/CustomerNameField'
import CustomerSurnameField from '@/components/Form/CustomerSurnameField'
import CustomerIDfield from '@/components/Form/CustomerIDfield'
import CustomerAccountField from '@/components/Form/CustomerAccountField'
import AmountField from '@/components/Form/AmountField'
import PaymentDetailsField from '@/components/Form/PaymentDetailsField'
import StatusField from '@/components/Form/StatusField'
import CommentsField from '@/components/Form/CommentsField'


 export default {
    components: {
        BrandsField,
        ReturnIdField,
        OrderIdField,
        CustomerNameField,
        CustomerSurnameField,
        CustomerIDfield,
        CustomerAccountField,
        AmountField,
        PaymentDetailsField,
        StatusField,
        CommentsField,
        DateField
    },
    setup: () => ({ v$: useVuelidate() }),
    data: () => ({
        isEditing: false,
    }),
    methods: {
        cancelEdit() {
            if (!this.addingRecord) {
                this.isEditing=!this.isEditing
            } else {
                this.returnToList()
            }
        },
        returnToList() {
            this.$router.go(-1)
        },
        async submitForm(){
            this.v$.$touch()
            if (this.v$.$invalid) {
                this.$store.commit('alert/showAlert', {
                    alertType: 'warning',
                    alertMessages: ['Please, correct errors']
                })
            } else {
                this.$store.dispatch('form/saveData')
                this.isEditing = false
            }
        },  
    },
    computed: {
        addingRecord () {
            return this.$store.state.form.addingRecord
            }
    },
    created () {
        document.title='Record detail' + '| Returns manager'
        if (!this.addingRecord) {
                this.$store.dispatch('form/loadRecordFromAPI')
            }
        //for creating new records we do not need to make initial call to the API
        else {
            this.isEditing=true
        }
    },
    beforeDestroy() {
        this.$store.commit('form/resetState')
    }
}

</script>