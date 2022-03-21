<template>
<v-form v-model="valid">
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
                <v-row align="center">
                    <v-col
                        class="d-flex"
                        cols="12"
                    >
                        <v-select
                        v-model="item.brand"
                        :items="brands"
                        item-text="name"
                        item-value="id"
                        label="Brand"
                        :readonly="!addingRecord"
                        :disabled="!addingRecord"
                        ></v-select>
                    </v-col>
                </v-row>
                <v-row align="center">
                    <v-col
                        class="d-flex"
                        cols="4"
                    >
                    <v-text-field
                        v-model="item.return_id"
                        label="Return ID"
                        required
                        :error-messages="returnIDErrors"
                        @input="$v.item.return_id.$touch()"
                        @blur="$v.item.return_id.$touch()"
                    ></v-text-field>
                    </v-col>

                    <v-col
                        class="d-flex"
                        cols="4"
                    >
                    <v-text-field
                        v-model="item.order_id"
                        label="Order ID"
                        required
                        :error-messages="orderIDErrors"
                        @input="$v.item.order_id.$touch()"
                        @blur="$v.item.order_id.$touch()"
                    ></v-text-field>
                    </v-col>

                    <v-col
                        class="d-flex"
                        cols="4"
                    >
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
                                    v-model="item.operation_date"
                                    label="Operation date"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="item.operation_date"
                                @input="dateMenu = false"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>
                </v-row>
                <v-row align="center">
                    <v-col
                        class="d-flex"
                        cols="4"
                    >
                    <v-text-field
                        v-model="item.customer_name"
                        label="Customer Name"
                        required
                        :error-messages="customerNameErrors"
                        @input="$v.item.customer_name.$touch()"
                        @blur="$v.item.customer_name.$touch()"
                    ></v-text-field>
                    </v-col>

                    <v-col
                        class="d-flex"
                        cols="4"
                    >
                    <v-text-field
                        v-model="item.customer_surname"
                        label="Customer Surname"
                        required
                        :error-messages="customerSurnameErrors"
                        @input="$v.item.customer_surname.$touch()"
                        @blur="$v.item.customer_surname.$touch()"
                    ></v-text-field>
                    </v-col>

                    <v-col
                        class="d-flex"
                        cols="4"
                    >
                    <v-text-field
                        v-model="item.customer_PID"
                        label="Customer PID"
                        required
                        :error-messages="customerPIDErrors"
                        @input="$v.item.customer_PID.$touch()"
                        @blur="$v.item.customer_PID.$touch()"
                    ></v-text-field>
                    </v-col>
                </v-row>
                <v-row align="center">
                    <v-col
                        class="d-flex"
                        cols="8"
                    >
                    <v-text-field
                        v-model="item.customer_account"
                        label="Customer Account"
                        required
                        :error-messages="customerAccountErrors"
                        @input="$v.item.customer_account.$touch()"
                        @blur="$v.item.customer_account.$touch()"
                    ></v-text-field>
                    </v-col>

                    <v-col
                        class="d-flex"
                        cols="4"
                    >
                    <v-text-field
                        v-model="item.amount"
                        label="Amount"
                        required
                        :error-messages="amountErrors"
                        @input="$v.item.amount.$touch()"
                        @blur="$v.item.amount.$touch()"
                    ></v-text-field>
                    </v-col>
                </v-row>
                <v-row align="center">
                    <v-col
                        class="d-flex"
                        cols="12"
                    >
                    <v-textarea
                        rows="1"
                        auto-grow
                        label="Payment details"
                        v-model="item.payment_details"
                        required
                        :error-messages="paymentDetailsErrors"
                        @input="$v.item.payment_details.$touch()"
                        @blur="$v.item.payment_details.$touch()"
                    >
                    
                    </v-textarea>
                    </v-col>
                </v-row>
                <v-row align="center">
                    <v-col
                        class="d-flex"
                        cols="4"
                    >
                        <v-select
                        v-model="item.status"
                        :items="statusChoices"
                        item-text="statusText"
                        item-value="statusKey"
                        label="Status"
                        attach
                        chips
                        >
                        </v-select>
                    </v-col>
                </v-row>
                <v-row align="center">
                    <v-col
                        class="d-flex"
                        cols="12"
                    >
                    <v-textarea
                        rows="1"
                        auto-grow
                        label="Comments"
                        v-model="item.comments"
                    >
                    </v-textarea> 
                    </v-col>
                </v-row>
                <v-row>
                <div v-if="!isEditing && !addingRecord">
                        <v-btn
                            class="ml-2 mb-2"
                            color="warning"
                            @click="isEditing=true"
                        >
                        <v-icon left>
                            mdi-pencil
                        </v-icon>
                        Edit
                        </v-btn>
                        <v-btn 
                            class="ml-2 mb-2" 
                            @click="returnToList()"
                        >
                        <v-icon left>
                            mdi-arrow-left
                        </v-icon>
                            Back
                        </v-btn>
                    </div>
                    <div v-else>
                        <v-btn
                            class="ml-2 mb-2"
                            color="success"
                            @click="submitForm()"
                        >
                        <v-icon left>
                            mdi-check
                        </v-icon>
                        Save
                        </v-btn>
                        <v-btn 
                            class="ml-2 mb-2"
                            color="error" 
                            @click="cancelEdit()"
                        >
                        <v-icon left>
                            mdi-cancel
                        </v-icon>
                            Cancel
                        </v-btn>
                    </div>
                </v-row>
            </v-form>
        </v-container>
    </v-card>
  </v-form>
 
</template>

<script>
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, integer, decimal } from 'vuelidate/lib/validators'


 export default {
    mixins: [validationMixin],
    props: {
        record_uuid: {
            type: String
            },
        addingRecord: { 
            type: Boolean,
            required: true
         },
        },
    validations: {
        item: {
            return_id: { required, integer },
            order_id: { required, integer },
            operation_date: { required },
            customer_name: { required },
            customer_surname: { required },
            customer_PID: { required },
            customer_account: { required, minLength: minLength(20), maxLength: maxLength(32) },
            amount: { required, decimal },
            payment_details: { required },
        }
    },
    data: () => ({
        dateMenu: false,
        isEditing: false,
        valid: false, 
        item: {},
        brands: [],
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
        cancelEdit() {
            if (!this.addingRecord) {
                this.isEditing=!this.isEditing
            } else {
                this.$router.go(-1)
            }
        },
        returnToList() {
                this.$router.go(-1)
            },
        async loadRecordFromAPI(){
            return axios.get(`/api/v1/return-record/${this.record_uuid}/detail`)
            .then(response =>{
                this.item=response.data
            })
            .catch(error =>{
                console.log(error)
            })
            
        },
        async loadBrandsList(){
            
            await axios.get('/api/v1/brands/')
            .then(response =>{
                this.brands=response.data
            })
            .catch(error =>{
                console.log(error)
            })
        },
        async submitForm(){
            this.$v.$touch()
            if (this.$v.$invalid) {
                this.$store.commit('showAlert', {
                    alertType: 'warning',
                    alertMessages: ['Please, correct errors']
                })
            } else {
                let payload=JSON.stringify(this.item)
                await axios.put(`/api/v1/return-record/${this.record_uuid}/detail`, payload, 
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                .then(response => {
                    this.isEditing=false
                    this.$store.commit('showAlert', {
                        alertType: 'success',
                        alertMessages: ['Data saved correctly']
                    })
                    
                })
                .catch(error =>{
                    console.log(error)
                    this.$store.commit('showAlert', {
                        alertType: 'error',
                        alertMessages: ['Something went wrong']
                    })
                })
            }
        },  
    },
    computed: {
      returnIDErrors () {
        const errors = []
        if (!this.$v.item.return_id.$dirty) return errors
        !this.$v.item.return_id.required && errors.push('Return ID is required.')
        !this.$v.item.return_id.integer && errors.push('Return ID must be a number.')
        return errors
        },
        orderIDErrors () {
        const errors = []
        if (!this.$v.item.order_id.$dirty) return errors
        !this.$v.item.order_id.required && errors.push('Order ID is required.')
        !this.$v.item.order_id.integer && errors.push('Return ID must be a number.')
        return errors
        },
        operationDateErrors () {
        const errors = []
        if (!this.$v.item.operation_date.$dirty) return errors
        !this.$v.item.operation_date.required && errors.push('Operation date is required.')
        return errors
        },
        customerNameErrors () {
        const errors = []
        if (!this.$v.item.customer_name.$dirty) return errors
        !this.$v.item.customer_name.required && errors.push('Name is required.')
        return errors
        },
        customerSurnameErrors () {
        const errors = []
        if (!this.$v.item.customer_surname.$dirty) return errors
        !this.$v.item.customer_surname.required && errors.push('Surname is required.')
        return errors
        },
        customerPIDErrors () {
        const errors = []
        if (!this.$v.item.customer_PID.$dirty) return errors
        !this.$v.item.customer_PID.required && errors.push('Customer PID is required.')
        return errors
        },
        customerAccountErrors () {
        const errors = []
        if (!this.$v.item.customer_account.$dirty) return errors
        !this.$v.item.customer_account.maxLength && errors.push('Account number may have up to 30 characters long')
        !this.$v.item.customer_account.minLength && errors.push('Account number must be at least 20 characters long')
        !this.$v.item.customer_account.required && errors.push('Order ID is required.')
        return errors
        },
        amountErrors () {
        const errors = []
        if (!this.$v.item.amount.$dirty) return errors
        !this.$v.item.amount.required && errors.push('Please, enter return amount.')
        !this.$v.item.amount.decimal && errors.push('Amount must be a number.')
        return errors
        },
        paymentDetailsErrors () {
        const errors = []
        if (!this.$v.item.payment_details.$dirty) return errors
        !this.$v.item.payment_details.required && errors.push('Payment details is required.')
        return errors
        },
    },
    created () {
        document.title='Record detail' + '| Returns manager'
        //for creating new records we do not need to make initial call to the API
        if (!this.addingRecord) {
                this.loadRecordFromAPI()
            }
        else {
            this.isEditing=true
        }
        //but we need to populate the brands drop-down list
        this.loadBrandsList()
    },
}

</script>