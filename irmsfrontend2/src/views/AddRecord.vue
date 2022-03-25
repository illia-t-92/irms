<template>
    <DetailsForm
    />
</template>

<script>
import DetailsForm from "../components/DetailsForm";

export default {
    components: { DetailsForm },
    beforeCreate() {
        this.$store.commit('form/setAddingRecord', true)
    }
}

</script>