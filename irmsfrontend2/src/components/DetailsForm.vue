<template>
    <v-container>
        <v-alert
        v-if="savedSuccess" 
        type="success"
        >
        Changes saved succesfully.
        </v-alert>
        <v-alert
        v-if="errorOnSave"
        type="error"
        >
        Something went wrong.
        </v-alert>
        <v-card
            class="mx-auto my-1"
            max-width="1456"
        >
            <v-form
                :disabled="!isEditing"
                @submit.prevent="submit"
            >
                <v-container>
                    <v-row>
                        <v-col
                            class="d-flex"
                            cols="10"
                        >
                            <v-select
                            :items="brands"
                            v-model="itemData.brand.id"
                            label="Brand"
                            outlined
                            item-text="name"
                            item-value="id"
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col
                            cols="12"
                            sm="6"
                            md="3"
                        >
                            <v-text-field
                                label="Return ID"
                                outlined
                                :value="itemData.return_id"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="3"
                        >
                            <v-text-field
                                label="Order ID"
                                outlined
                                :value="itemData.order_id"
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="3"
                        >
                            <v-text-field
                                label="Amount"
                                outlined
                                :value="itemData.amount"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    
                    <v-row>
                        <v-col
                            cols="12"
                            sm="5"
                            md="5"
                        >
                            <v-text-field
                                label="Customer name"
                                outlined
                                :value="itemData.customer_name"
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="5"
                            md="5"
                        >
                            <v-text-field
                                label="Customer surname"
                                outlined
                                :value="itemData.customer_surname"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col
                            cols="12"
                            sm="6"
                            md="5"
                        >
                            <v-text-field
                                label="Customer PID"
                                outlined
                                :value="itemData.customer_PID"
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="5"
                        >
                            <v-text-field
                                label="Customer account"
                                outlined
                                :value="itemData.customer_account"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col
                            class="d-flex"
                            cols="10"
                        >
                            <v-textarea
                                label="Payment details"
                                auto-grow
                                outlined
                                rows="3"
                                row-height="20"
                                :value="itemData.payment_details"
                            ></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col
                            class="d-flex"
                            cols="4"
                        >
                            <v-select
                                :items="statusChoices"
                                label="Status"
                                item-text="statusText"
                                item-value="statusKey"
                                v-model="itemData.status"
                                outlined
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col
                            class="d-flex"
                            cols="10"
                        >
                            <v-textarea
                            label="Comments"
                            auto-grow
                            outlined
                            rows="2"
                            row-height="20"
                            :value="itemData.comments"
                            ></v-textarea>
                        </v-col>
                    </v-row>
                    <div v-if="!isEditing">
                        <v-btn
                            color="warning"
                            @click="isEditing=true"
                        >
                        <v-icon left>
                            mdi-pencil
                        </v-icon>
                        Edit
                        </v-btn>
                        <v-btn 
                            class="ma-2" 
                            @click=  "$router.go(-1)"
                        >
                        <v-icon left>
                            mdi-arrow-left
                        </v-icon>
                            Back
                        </v-btn>
                    </div>
                    <div v-else>
                        <v-btn
                            color="success"
                            @click="submitChanges()"
                        >
                        <v-icon left>
                            mdi-check
                        </v-icon>
                        Save
                        </v-btn>
                        <v-btn 
                            class="ma-2"
                            color="error" 
                            @click="isEditing=!isEditing"
                        >
                        <v-icon left>
                            mdi-cancel
                        </v-icon>
                            Cancel
                        </v-btn>
                    </div>
                </v-container>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: 'DetailsForm',
    props: {
        item: Object,
        brands: Array,
    },
    data() {
        return {
            isEditing: false,
            savedSuccess: false,
            errorOnSave: false,
            itemData: {},
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
                    statusKey: "CHECK",
                    statusText: "Review"
                }, 
                {
                    statusKey: "BLOCK",
                    statusText: "Block"
                }
            ],
        }
    },
    created: function() {
            this.itemData= this.item
        },
    mounted () {

    },
    methods: {
        async submitChanges(){
            let payload=this.itemData
            console.log(payload)
            this.isEditing=false
        }
    }
    
}
</script>