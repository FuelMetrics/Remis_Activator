<template>
    <CModal backdrop="static" alignment="center" size="sm" class="alertStyle" :visible="openAlertModal"
        @close="() => { openAlertModal = false }">
        <CModalHeader>
            <CModalTitle>{{ title && title.length > 0 ? title : 'Alert' }}</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <p>
                {{ message }}
            </p>
        </CModalBody>
        <CModalFooter>
            <CButton color="danger" @click="() => { openAlertModal = false }">Ok</CButton>
        </CModalFooter>
</CModal>
</template>


<script>
export default {
    name: 'spinner',
    props: ['title', 'message', 'icon'],
    data() {
        return {
            openAlertModal: false
        }
    }
}
</script>