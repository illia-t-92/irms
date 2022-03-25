<template>
    <DetailsForm
    />
</template>

<script>
import DetailsForm from "../components/DetailsForm";

export default {
    components: { DetailsForm },
    props: ['record_uuid'],
    mounted() {
        this.$store.commit('form/setAddingRecord', false)
    }
}

</script>