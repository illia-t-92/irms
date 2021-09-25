<template>
<div>
    <Navbar />
    <DataTable 
    :value="records" :lazy="true" :paginator="true" :rows="10" @page="onPage($event)" @sort="onSort($event)" @filter="onFilter($event)"
    :filters="filters" ref="dt" :totalRecords="totalRecords" :loading="loading" filterDisplay="row"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10,15,20,30]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
    :globalFilterFields="['return_id','order_id', 'customer_name', 'customer_surname']"
    responsiveLayout="stack" removableSort
    >
    <template #header>
        <div class="table-header">
            Header
        </div>
    </template>
    <template #empty>
        No records found.
    </template>
    <template #loading>
        <p>Loading records, please, wait...</p>
    </template>
    <Column field="return_id" header="Return ID" :sortable="true" ref="return_id" filterField="return_id">
        <template #filter="{filterModel,filterCallback}">
            <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" 
                class="p-column-filter" :placeholder="'Search by return id'"
             />
        </template> 
    </Column>
    <Column field="order_id" header="OrderI ID" :sortable="true" ref="order_id" filterField="order_id">
        <template #filter="{filterModel,filterCallback}">
            <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()"
                class="p-column-filter" :placeholder="'Search by order id'"
            />
        </template>
    </Column>
    <Column field="operation_date" header="Date" :sortable="true"></Column>
    <Column field="amount" header="Amount" :sortable="true"></Column>
    <Column field="customer_name" header="Name" :sortable="true" ref="customer_name" filterField="customer_name">
        <template #filter="{filterModel,filterCallback}">
            <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()"
                class="p-column-filter" :placeholder="'Search by name'" 
            />
        </template>
    </Column>
    <Column field="customer_surname" header="Surname" :sortable="true" ref="customer_surname" filterField="customer_surname">
        <template #filter="{filterModel,filterCallback}">
            <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()"
                class="p-column-filter" :placeholder="'Search by surname'"
            />
        </template>
    </Column>
    <Column field="status" header="Status" :sortable="true">
    <template #body="{data}">
        <Tag :class="getStyling(data).class" :icon="getStyling(data).icon" :severity="getStyling(data).severity">
            {{ data.status_verbose }}
        </Tag>
    </template>
    </Column>
    </DataTable>
</div>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import InputText from 'primevue/inputtext' 
import Navbar from '@/components/Navbar'
import RecordsService from '@/services/RecordsService'
import axios from 'axios'

export default {
    components:{
        Navbar,
        DataTable,
        Column,
        Tag,
        InputText,
    },
    data(){
        return{
            records: null,
            totalRecords: 0,
            loading: false,
            filters: {
                'return_id': {value: '',  matchMode: 'contains'},
                'order_id': {value: '',  matchMode: 'contains'},
                'operation_date': {value: '',  matchMode: 'contains'},
                'amount': {value: '',  matchMode: 'contains'},
                'customer_name': {value: '',  matchMode: 'contains'},
                'customer_surname': {value: '',  matchMode: 'contains'},
            },
            lazyParams:{},
            columns: [
                {field: 'return_id', header: 'Return ID'},
                {field: 'order_id', header: 'Order ID'},
                {field: 'operation_date', header: 'Date'},
                {field: 'amount', header: 'Amount'},
                {field: 'customer_name', header: 'Name'},
                {field: 'customer_surname', header: 'Surname'},
                {field: 'status', header: 'Status'},
            ],
        }
    },
    recordsService: null,
    created() {
        document.title='Return records' + ' | Returns manager'
        this.recordsService = new RecordsService();
    },
    mounted(){
        this.loading=true
        this.lazyParams = {
            first: 0,
            rows: this.$refs.dt.rows,
            sortField: null,
            sortOrder: null,
            filters: this.filters

        };
        this.loadRecords()
    },
    methods: {
        async loadRecords(){
            let sortOrder = this.lazyParams.sortOrder === -1 ? '-' : ''
            await axios.get(`/api/v1/records-list/?limit=${this.lazyParams.rows}&offset=${this.lazyParams.first}&ordering=${sortOrder}${this.lazyParams.sortField}`)
            .then(response =>{

                this.totalRecords=response.data.count
                this.records=response.data.results
                this.loading=false
                document.title='Return records' + '| Returns manager'
            })
            .catch(error =>{
                console.log(error)
            })
            
        },
        getStyling(data) {
                if(data.status === 'NEW') {
                    return  {
                            severity: 'primary',
                            icon: 'pi pi-plus'
                            }
                }
                if(data.status === 'OK') {
                    return {
                            severity: 'success',
                            icon: "pi pi-check"
                            }
                }
                if(data.status === 'CHECK') {
                    return {
                            severity:'danger',
                            icon: 'pi pi-exclamation-triangle'
                            }
                }
                if(data.status === 'PAID') {
                    return {
                            severity:'info',
                            icon: 'pi pi-info-circle'
                            }
                }
                if(data.status === 'REVIEW') {
                    return {
                            severity:'warning',
                            icon: 'pi pi-pencil'
                            }
                }
                if(data.status === 'BLOCK') {
                    return {
                            severity:'dark',
                            class: 'p-tag-dark',
                            icon : 'pi pi-times'
                            }
                }
        },
        onPage(event) {
            this.lazyParams = event;
            this.loadRecords();
        },
        onSort(event) {
            this.lazyParams = event;
            this.loadRecords();
        },
        onFilter() {
            console.log(this.filters)
            this.lazyParams.filters = this.filters;
            this.loadRecords();
        }
    },
}
</script>

<style lang="scss" scoped>
::v-deep(.p-tag-dark) {
        background: #212121;
    }

</style>