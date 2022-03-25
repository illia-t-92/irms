<template>
    <v-select
        v-model="status"
        :items="statusChoices"
        item-text="statusText"
        item-value="statusKey"
        label="Status"
        attach
        chips
    >
    </v-select>
</template>

<script>

export default {
    /*
    props: {
        addingRecord: Boolean,
    },
    */
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
    },
}
</script>