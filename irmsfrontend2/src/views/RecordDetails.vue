<template>
    <DetailsForm
        :addingRecord="false"
    />
</template>

<script>
import DetailsForm from "../components/DetailsForm";

export default {
    components: { DetailsForm },
    props: ['record_uuid'],
}

</script>