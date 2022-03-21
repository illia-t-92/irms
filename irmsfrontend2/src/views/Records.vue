<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="records"
            :options.sync="options"
            :server-items-length="totalRecords"
            :loading="loading"
            loading-text="Loading... Please wait"
            class="elevation-1"
    >
    <template v-slot:item.status="{ item }">
        <StatusChip :item="item" />
    </template>
    <template v-slot:item.details="{ item }">
        <v-btn
            tile
            outlined
            color="success"
            :to="{ name: 'record_details', params: { record_uuid: item.uuid }}"
        >
            View details
        </v-btn>
    </template>
    </v-data-table>
    </div>
</template>

<script>
import axios from 'axios'
import StatusChip from '@/components/StatusChip'

export default {
    components: {
        StatusChip
    },
    data() {
        return {
            headers: [
                { text: 'Return ID', value: 'return_id', align: 'center' },
                { text: 'Order ID', value: 'order_id', align: 'center' },
                { text: 'Request date', value: 'operation_date', align: 'center' },
                { text: 'Amount', value: 'amount', align: 'center' },
                { text: 'Customer name', value: 'customer_name', align: 'center' },
                { text: 'Customer surname', value: 'customer_surname', align: 'center' },
                { text: 'Status', value: 'status', align: 'center' },
                { text: 'View details', value:'details', align: 'center', sortable: false },
            ],
            page: 1,
            totalRecords: 0,
            records : [],
            loading: true,
            options: {},
        }
    },
    watch: {
      options: {
        handler () {
          this.loadRecordsFromAPI()
        },
        deep: true,
      },
    },
    mounted () {
      this.loadRecordsFromAPI()
    },
    methods: {
        async loadRecordsFromAPI(){
            this.loading=true
            const { sortBy, sortDesc, page, itemsPerPage } = this.options
            let offset = page * itemsPerPage - itemsPerPage;
            let isPaginated=false
            let paginationQuery=''
            if (itemsPerPage !=-1 && page !=-1){
                paginationQuery=`?limit=${itemsPerPage}&offset=${offset}`
                isPaginated=true
            } 
            let orderingQuery=''
            if (sortBy.length === 1 && sortDesc.length === 1) {
                if(isPaginated) {
                    orderingQuery=`&ordering=${sortDesc[0] ? '-' : ''}${sortBy[0]}`
                } else {
                    orderingQuery=`?ordering=${sortDesc[0] ? '-' : ''}${sortBy[0]}`
                }
            }
            await axios.get(`/api/v1/records-list/${paginationQuery}${orderingQuery}`)
            .then(response =>{
                
                if(isPaginated == true){
                    this.records=response.data.results
                    this.totalRecords=response.data.count
                } else {
                    this.records=response.data
                }                
                document.title='Return records' + '| Returns manager'
                this.loading=false
            })
            .catch(error =>{
                console.log(error)
            })
        },
    }
}

</script>