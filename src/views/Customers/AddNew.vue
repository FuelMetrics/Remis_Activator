<template>
    <div>
        <CRow>
            <CCol :md="12">
                <CCard class="mb-4">
                    <CCardBody>
                        <CTable align="middle" class="mb-0 border" hover responsive>
                            <CTableHead color="light">
                                <CTableRow>
                                    <CTableHeaderCell class="text-center">
                                        <CIcon name="cil-people" />
                                    </CTableHeaderCell>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableHeaderCell class="text-center">Country</CTableHeaderCell>
                                    <CTableHeaderCell>Email | Phone</CTableHeaderCell>
                                    <CTableHeaderCell>Card Number</CTableHeaderCell>
                                    <CTableHeaderCell>Balance</CTableHeaderCell>
                                    <CTableHeaderCell class="text-center">Payment Method</CTableHeaderCell>
                                    <CTableHeaderCell>Activity</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody v-if="activators.length > 0">
                                <CTableRow v-for="item in activators" :key="item.name">
                                    <CTableDataCell class="text-center">
                                        <CAvatar v-if="item.avatar.src !== null" size="md" :src="item.avatar.src"
                                            :status="item.avatar.status" />
                                        <CIcon v-else name="cil-people" :status="item.avatar.status" />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <div>{{ item.name }}</div>

                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <CIcon size="xl" :name="item.country.flag" :title="item.country.name" />
                                    </CTableDataCell>
                                    <CTableDataCell class="text-left">
                                        <div>{{ item.email }}</div>
                                        <div class="small text-medium-emphasis">
                                            <span>New</span> | {{ item.phoneNo }}
                                        </div>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-left">
                                        <span>{{ item.phoneNo }}</span>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <span class="small text-medium-emphasis">NGN</span>
                                        &nbsp; <strong>0.00</strong>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <CIcon size="xl" :name="item.payment.icon" />
                                    </CTableDataCell>
                                </CTableRow>
                                <CTableRow> </CTableRow>
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
</div>
</template>

<script>
import config from '@/config'
import avatar1 from '@/assets/images/avatars/1.jpg'

export default {
    name: 'Activators',
    title: 'Activators',
    components: {

    },
    data() {
        return {
            activators: [
                {
                    avatar: { src: avatar1, status: 'success' },
                    name: 'Gabriel Ojomu',
                    new: true,
                    registered: 'Jan 1, 2021',
                    email: 'gabriel@email.com',
                    phoneNo: '08099009988',
                    country: { name: 'NGA', flag: 'cif-ng' },
                    payment: { name: 'Mastercard', icon: 'cib-cc-mastercard' },
                    activity: '10 sec ago',
                },
                {
                    avatar: { src: null, status: 'success' },
                    name: 'Tomiwa Oluwawibe',
                    new: true,
                    registered: 'Jan 1, 2023',
                    email: 'tomiwa@email.com',
                    phoneNo: '08099009999',
                    country: { name: 'NGA', flag: 'cif-ng' },
                    payment: { name: 'Visa', icon: 'cib-cc-visacard' },
                    activity: '10 sec ago',
                }
            ]
        }
    },
    mounted() {
        console.log('Mounted')
        this.getActivators();
    },
    methods: {
        getActivators() {
            this.axios.get(`${config.apiBaseUrl}/CompanyUsers/All`, config.authConfig)
                .then(res => {
                    this.activators = res.data.data;
                })
                .catch(() => {
                    console.log('Unable to get list');
                })
        }
    }
}
</script>