<template>
     <v-chip
        
        :color="getStatusFormat(item.status).color"
        :text-color="getStatusFormat(item.status).text_color"
      >
        <v-icon class="mr-2">
          {{ getStatusFormat(item.status).icon }}
          </v-icon>
        {{ item.status_verbose }}
      </v-chip>
</template>

<script>
import axios from 'axios'

export default {
    props: {
        item: Object,
    },
    methods: {
        getStatusFormat (status) {
            if (status === 'NEW') return {
                color :'indigo',
                text_color : 'white',
                icon: 'mdi-plus-circle-outline'
            }
            else if (status === 'OK') return {
                color: 'green',
                text_color: 'white',
                icon: 'mdi-check'
                }
            else if (status === 'CHECK') return {
                color: 'red',
                text_color: 'white',
                icon: 'mdi-alert-octagon' 
                }
            else if (status === 'PAID') return {
                color: 'grey',
                text_color: 'black',
                icon: 'mdi-check-all' 
                }
            else if (status === 'REVIEW') return {
                color: 'yellow', 
                text_color: 'black',
                icon: 'mdi-account-search-outline'
                }
            else if (status === 'BLOCK') return {
                color: 'black',
                text_color: 'white',
                icon: 'mdi-close-octagon'
                }
        },
    }
}

</script>