<template>
    <v-btn
        tile
        outlined
        color="success"
        :to="{ name: 'record_details', params: { record_uuid: item.uuid }}"
    >
        View details
    </v-btn>
</template>

<script>

export default {
    props: {
        item: Object,
    }       
}
</script>
