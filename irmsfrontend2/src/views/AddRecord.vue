<template>
    <DetailsForm
    />
</template>

<script>
import DetailsForm from "../components/DetailsForm";

export default {
    components: { DetailsForm },
    mounted() {
        this.$store.commit('form/setAddingRecord', true)
    }
}

</script>