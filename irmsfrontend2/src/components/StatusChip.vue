<template>
     <v-chip
        
        :color="statuses[item.status].color"
        :text-color="statuses[item.status].text_color"
      >
        <v-icon class="mr-2">
          {{ statuses[item.status].icon }}
          </v-icon>
        {{ item.status_verbose }}
      </v-chip>
</template>

<script>

export default {
    props: {
        item: Object,
    },
    data: () => ({
        statuses: {
            NEW: {
                color :'indigo',
                text_color : 'white',
                icon: 'mdi-plus-circle-outline'
            },
            OK: {
                color: 'green',
                text_color: 'white',
                icon: 'mdi-check'
            },
            CHECK: {
                color: 'red',
                text_color: 'white',
                icon: 'mdi-alert-octagon' 
            },
            PAID: {
                color: 'grey',
                text_color: 'black',
                icon: 'mdi-check-all'  
            },
            REVIEW: {
                color: 'yellow', 
                text_color: 'black',
                icon: 'mdi-account-search-outline' 
            },
            BLOCK: {
                color: 'black',
                text_color: 'white',
                icon: 'mdi-close-octagon'
            },
        }
    }),
}

</script>