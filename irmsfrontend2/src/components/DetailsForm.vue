<template>
<v-form v-model="valid">
    <v-container>
        <v-alert
            class="mt-n16"
            :value="alert.display"
            :type="alert.type"
            transition="fade-transition"
            dismissible
            >
            {{ alert.message }}
        </v-alert>
    </v-container>
    <v-card
        class="mx-auto"
        color="white"
        max-width="900"
    >
        <v-container d-flex justify-space-around>
            <v-form
                :disabled="!isEditing"
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
                        readonly
                        disabled
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
                <div v-if="!isEditing">
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
                            @click= "$router.go(-1)"
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
                            @click="isEditing=!isEditing"
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
        record_uuid: String,
        item: Object,
        isEditing: Boolean,
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
        editable: false,
        alert: {
            display: false,
            message: '',
            type: 'error',
        },
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
        async loadRecordFromAPI(){
            
            await axios.get(`/api/v1/return-record/${this.record_uuid}/detail`)
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
                this.alert={
                    display: true,
                    message: 'Please, correct errors',
                    type: 'warning'
                }
            } else if (!this.isEditing) {
                let payload=JSON.stringify(this.item)
                await axios.post(`/api/v1/return-records/`, payload, 
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                .then(response =>{
                    this.isEditing=false
                    this.alert={
                        display: true,
                        message: 'Data saved correctly',
                        type: 'success',
                    }
                    
                })
                .catch(error =>{
                    console.log(error)
                    this.alert={
                    display: true,
                    message: 'Something went wrong',
                    type: 'error',
                    }
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
                .then(response =>{
                    this.isEditing=false
                    this.alert={
                        display: true,
                        message: 'Data saved correctly',
                        type: 'success',
                    }
                    
                })
                .catch(error =>{
                    console.log(error)
                    this.alert={
                    display: true,
                    message: 'Something went wrong',
                    type: 'error',
                    }
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
        if (this.isEditing) {
            this.loadRecordFromAPI()
        }
        this.loadBrandsList()
    },
    watch: {
        alert(new_val){
            if(new_val){
                setTimeout(()=>{this.alert.display=false},2000)
            }
        }   
  }
}

</script>