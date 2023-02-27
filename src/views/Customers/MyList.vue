<template>
    <div>
        <CRow>
            <CCol :md="12">
                <div class="text-right mb-3">
                    <CButton color="success" @click="() => { openAddNewModal = true }">Add New</CButton>
                </div>
                <CCard class="mb-4">
                    <CCardBody>
                        <CTable align="middle" class="mb-0 border" hover responsive>
                            <CTableHead color="light">
                                <CTableRow>
                                    <CTableHeaderCell class="text-center">
                                        <CIcon name="cil-people" />
                                    </CTableHeaderCell>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <!-- <CTableHeaderCell class="text-center">Country</CTableHeaderCell> -->
                                    <CTableHeaderCell>Email | Phone</CTableHeaderCell>
                                    <CTableHeaderCell>Card Number</CTableHeaderCell>
                                    <CTableHeaderCell>Balance</CTableHeaderCell>
                                    <CTableHeaderCell class="text-center">Date Activated</CTableHeaderCell>
                                    <CTableHeaderCell class="text-right">Activity</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody v-if="activations.length > 0">
                                <CTableRow v-for="item in activations" :key="item.id">
                                    <CTableDataCell class="text-center">
                                        {{ activations.indexOf(item) + 1 }}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <div>{{ item.fullName }}</div>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-left">
                                        <div>{{ item.email }}</div>
                                        <div class="small text-medium-emphasis">
                                            {{ item.phoneNumber }}
                                        </div>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-left">
                                        <span>{{ item.cardNumber }}</span>
                                    </CTableDataCell>

                                    <CTableDataCell>
                                        <span class="small text-medium-emphasis">NGN</span>
                                        &nbsp; <strong>0.00</strong>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <span>{{ item.dateActivatedStr }}</span>
                                        <!-- <CIcon size="xl" :name="item.payment.icon" /> -->
                                    </CTableDataCell>
                                    <CTableDataCell class="text-right">
                                        <CButton size="sm" v-if="item.cardActivated === false" color="primary"
                                            @click="toggleActivateCard(item.id)">
                                            Activate Card
                                        </CButton>
                                    </CTableDataCell>
                                </CTableRow>
                                <CTableRow> </CTableRow>
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
        <CModal backdrop="static" :visible="openActivateCardModal" @close="() => { openActivateCardModal = false }">
            <CModalHeader>
                <CModalTitle>Activate New User</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <p>
                    Activating Remis card <strong>{{ selectedUser.cardNumber }}</strong> for newly activated user
                    <strong>'{{
                        selectedUser.fullName }}'</strong>, please enter new PIN to activate card
                </p>
                <CForm>
                    <CFormInput type="number" v-model="newPin" id="newPin" floatingLabel="New PIN" />
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" @click="() => { openActivateCardModal = false }">
                    Close
                </CButton>
                <CButton color="primary" @click="activateCard()">Save
                    <CIcon size="sm" :name="'cilPlus'" />
                </CButton>
            </CModalFooter>
        </CModal>

        <CModal backdrop="static" :visible="openAddNewModal" @close="() => { openAddNewModal = false }">
            <CModalHeader>
                <CModalTitle>Activate User Card</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm>
                    <CFormInput type="text" v-model="firstName" id="firstName" floatingLabel="First Name"
                        placeholder="John" />
                    <CFormInput type="text" v-model="lastName" id="lastName" floatingLabel="Last Name" placeholder="Doe" />
                    <CFormInput type="phone" v-model="phone" id="phone" floatingLabel="Phone Number"
                        placeholder="08033331234" />
                    <CFormInput type="email" v-model="email" id="email" floatingLabel="Email address"
                        placeholder="name@example.com" />
                    <CFormFloating>
                        <CFormSelect aria-label="Select Country" v-model="country" :options="countries">
                        </CFormSelect>
                    </CFormFloating>

                    <CFormInput type="text" v-model="cardNumber" id="cardNumber" floatingLabel="Card Number"
                        placeholder="123 456 7890" />
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" @click="() => { openAddNewModal = false }">
                    Close
                </CButton>
                <CButton color="primary" @click="activateNew()">Save
                    <CIcon size="sm" :name="'cilPlus'" />
                </CButton>
            </CModalFooter>
        </CModal>
</div>
</template>

<script>
import config from '@/config'
import moment from 'moment'
import { mapGetters } from "vuex";
import { CButton } from '@coreui/vue';

export default {
    name: 'Activators',
    title: 'Activators',
    components: {
        CButton,
        // moment
    },
    data() {
        return {
            openAddNewModal: false,
            openActivateCardModal: false,
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            country: '',
            cardNumber: '',
            countries: [
                'Select a country'
            ],
            activations: [],
            branches: [],
            newPin: '',
            selectedCardNo: '',
            selectedCardOwner: ''
        }
    },
    computed: {
        ...mapGetters({
            authConfig: "getAuthConfig",
        }),
    },
    mounted() {
        this.getActivations();
        this.getCountries();
        this.getBranches();
    },
    methods: {
        activateNew() {
            if (!this.validateEntry()) {
                alert('Please complete all required fields before proceeding');
            }
            else {
                let model = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    phone: this.phone,
                    cardNumber: this.cardNumber,
                    country: this.country,
                    branchId: '00000000-0000-0000-0000-000000000000'
                }
                this.axios.post(`${config.apiBaseUrl}/Activator/Activate`, model, this.authConfig)
                    .then(res => {
                        console.log('Activation response: ', res.data)
                        this.getActivations();
                        this.openAddNewModal = false
                        // this.activators = res.data.data;
                    })
                    .catch(() => {
                        console.log('Unable create new activation');
                    })
            }
        },
        toggleActivateCard(id) {
            this.selectedUser = this.activations.filter(a => a.id === id)[0]
            this.openActivateCardModal = true;
        },
        activateCard() {
            let model = {
                oldPin: '0000',
                newPin: this.newPin
            }
            this.axios.post(`${config.apiBaseUrl}/Activator/ActivateCard/${this.selectedUser.cardNumber}/${this.selectedUser.ownerId}`, model, this.authConfig)
                .then(res => {
                    console.log('Activation response: ', res.data)
                    this.selectedUser.cardActivated = true;
                    this.openActivateCardModal = false
                    // this.activators = res.data.data;
                })
                .catch(() => {
                    console.log('Unable create new activation');
                })
        },
        getActivations() {
            this.axios.get(`${config.apiBaseUrl}/Activator/MyActivations`, this.authConfig)
                .then(res => {
                    console.log(res.data)
                    res.data.forEach(e => {
                        e.dateActivatedStr = moment(e.dateActivated).format('MMM DD, YYYY - h:m:a')
                    });
                    this.activations = res.data;
                })
                .catch(() => {
                    console.log('Unable to get My Activations');
                })
        },
        getCountries() {
            this.axios.get(`${config.apiBaseUrl}/Utility/Countries`, this.authConfig)
                .then(res => {
                    this.countries = [
                        'Select a country'
                    ];
                    let c = res.data.data;
                    c.forEach(ele => {
                        this.countries.push({ label: ele.name, value: ele.name })
                    });
                })
                .catch(() => {
                    console.log('Unable to get list');
                })
        },
        getBranches() {

            this.axios.get(`${config.apiBaseUrl}/Activator/Branches`, this.authConfig)
                .then(res => {
                    this.branches = res.data.data;
                })
                .catch(() => {
                    console.log('Unable to get branches list');
                })
        },
        validateEntry() {
            if (!this.firstName || this.firstName.length <= 0) {
                return false;
            }
            if (!this.lastName || this.lastName.length <= 0) {
                return false;
            }
            if (!this.email || this.email.length <= 0) {
                return false;
            }
            if (!this.phone || this.phone.length <= 0) {
                return false;
            }
            if (!this.country || this.country.length <= 0) {
                return false;
            }
            if (!this.cardNumber || this.cardNumber.length <= 0) {
                return false;
            }

            return true;
        }
    }
}
</script>