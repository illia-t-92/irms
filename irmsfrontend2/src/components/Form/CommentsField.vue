<template>
    <v-textarea
        rows="1"
        auto-grow
        label="Comments"
        v-model="comments"
    >
    </v-textarea> 
</template>

<script>

export default {
    props: {
        addingRecord: Boolean,
    },
    data: () => ({
    }),
    computed: {
        comments: {
            get () {
                return this.$store.state.form.item.comments
            },
            set (value) {
                let payload = { field: 'comments', value: value}
                this.$store.commit('form/changeFieldValue', payload)
            }
        },
    }
}
</script>