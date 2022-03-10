<template>
    <DetailsForm
        :addingRecord="false"
        :record_uuid="record_uuid"
    />
</template>

<script>
import DetailsForm from "../components/DetailsForm";

export default {
    components: { DetailsForm },
    props: ['record_uuid'],
}

</script>