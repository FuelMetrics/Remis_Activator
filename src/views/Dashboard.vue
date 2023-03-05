<template>
  <div>
    <div class="row">
      <div class="col-md-3 col-sm-6 col-12">
        <div class="card bg-primary text-high-emphasis-inverse mb-4 card-tile">
          <div class="card-body pb-0 d-flex justify-content-between align-items-start">
            <div>
              <div class="fs-4 fw-semibold">{{ tileTotal }}</div>
              <div>Total Activations</div>
            </div>
          </div> &nbsp;
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-12">
        <div class="card bg-primary text-high-emphasis-inverse mb-4 card-tile">
          <div class="card-body pb-0 d-flex justify-content-between align-items-start">
            <div>
              <div class="fs-4 fw-semibold">{{ tileToday }}</div>
              <div>Activations Today</div>
            </div>
          </div> &nbsp;
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-12">
        <div class="card bg-info text-high-emphasis-inverse mb-4 card-tile">
          <div class="card-body pb-0 d-flex justify-content-between align-items-start">
            <CTooltip v-if="currentLocation && currentLocation !== null" :content="currentLocation.stationName"
              placement="bottom">
              <template #toggler="{ on }">
                <!-- <CButton color="secondary" v-on="on">Tooltip on top</CButton> -->
                <div style="overflow: auto;" v-on="on">
                  <div class="fs-5 fw-semibold truncateWidth" style="--wth: 100%;">{{ currentLocation.stationName }}</div>
                  <div style="font-size: small;">{{ currentLocation.street }}</div>
                </div>
              </template>
            </CTooltip>

            <div v-else>
              <div>Not mapped to any location yet</div>
            </div>
          </div>
          <div v-if="locationLoading" class="b-overlay position-absolute" style="inset: 0px; z-index: 10;">
            <div class="position-absolute bg-light rounded-sm"
              style="inset: 0px; opacity: 0.85; backdrop-filter: blur(2px);"></div>
            <div class="position-absolute" style="top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);">
              <span aria-hidden="true" class="spinner-border"><!----></span>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="col-md-3 offset-md-3 col-sm-6 col-12"> -->
      <div class="col-md-3 col-sm-6 col-12">
        <div class="card bg-transparent text-high-emphasis-inverse mb-4" style="border-color: transparent;">
          <div class="card-body pb-0 d-flex justify-content-end align-items-start">
            <div>
              <div class="fs-4 fw-semibold">
                <CButton color="success" @click="() => { openAddNewModal = true }">Activate New User</CButton>
              </div>
              <div>
                <div style="text-align: right;">&nbsp;</div>
              </div>
            </div>
          </div> &nbsp;
        </div>
      </div>
    </div>
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
                    <!-- <CTableHeaderCell class="text-center">Country</CTableHeaderCell> -->
                    <CTableHeaderCell>Email | Phone</CTableHeaderCell>
                    <CTableHeaderCell>Card Number</CTableHeaderCell>
                    <!-- <CTableHeaderCell>Balance</CTableHeaderCell> -->
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

                    <!-- <CTableDataCell>
                                    <span class="small text-medium-emphasis">NGN</span>
                                    &nbsp; <strong>0.00</strong>
                                  </CTableDataCell> -->
                    <CTableDataCell class="text-center">
                      <span>{{ item.dateActivatedStr }}</span>
                      <!-- <CIcon size="xl" :name="item.payment.icon" /> -->
                    </CTableDataCell>
                    <CTableDataCell class="text-right">
                      <CButton size="sm" v-if="item.cardActivated === false" color="primary"
                        @click="toggleActivateCard(item.id)">
                        Activate Card
                      </CButton>
                      <CButton size="sm" v-else color="info" @click="toggleTransactions(item.id)">
                        Transactions
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


      <CModal backdrop="static" :visible="openMapCardUserModal" @close="() => { openMapCardUserModal = false }">
        <CModalHeader>
          <CModalTitle>Map Existing User to Card</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>
            User with the provided email/phone "<strong>{{ email }}/{{ phone }}</strong>" is already existing. Do you want
            to proceed to linking the card <string>{{ cardNumber }}</string> to this user?
          </p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" @click="() => { openMapCardUserModal = false }" :disabled="disableButton"
            :class="disableButton || sending ? 'disabled' : ''">
            NO! Cancel
          </CButton>
          <CButton color="primary" @click="mapCardToExistingUser()" :disabled="disableButton"
            :class="disableButton || sending ? 'disabled' : ''" type="submit">
            <span class="mb-0" v-if="!sending">YES! Link Card</span>
            <span v-else-if="sending" :class="sending ? 'wait' : ''">
              Please wait
              <spinner />
            </span>
          </CButton>
        </CModalFooter>
      </CModal>


      <CModal backdrop="static" :visible="openActivateCardModal" @close="() => { openActivateCardModal = false }">
        <CModalHeader>
          <CModalTitle>Activate User Card</CModalTitle>
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
          <CButton color="secondary" @click="() => { openActivateCardModal = false }" :disabled="disableButton"
            :class="disableButton || sending ? 'disabled' : ''">
            Close
          </CButton>
          <CButton color="primary" @click="activateCard()" :disabled="disableButton"
            :class="disableButton || sending ? 'disabled' : ''" type="submit">
            <span class="mb-0" v-if="!sending">Save
              <CIcon size="sm" :name="'cilPlus'" />
            </span>
            <span v-else-if="sending" :class="sending ? 'wait' : ''">
              Please wait
              <spinner />
            </span>
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal backdrop="static" :visible="openAddNewModal" @close="() => { openAddNewModal = false }">
        <CModalHeader>
          <CModalTitle>Activate New User</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput type="text" v-model="firstName" id="firstName" floatingLabel="First Name" placeholder="John" />
            <CFormInput type="text" v-model="lastName" id="lastName" floatingLabel="Last Name" placeholder="Doe" />
            <CFormInput type="phone" v-model="phone" id="phone" floatingLabel="Phone Number" placeholder="08033331234" />
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
          <CButton color="secondary" @click="() => { openAddNewModal = false }" :disabled="disableButton"
            :class="disableButton || sending ? 'disabled' : ''">
            Close
          </CButton>
          <CButton color="primary" @click="activateNew()" :disabled="disableButton"
            :class="disableButton || sending ? 'disabled' : ''" type="submit">
            <span class="mb-0" v-if="!sending">Save
              <CIcon size="sm" :name="'cilPlus'" />
            </span>
            <span v-else-if="sending" :class="sending ? 'wait' : ''">
              Please wait
              <spinner />
            </span>
          </CButton>
        </CModalFooter>
      </CModal>


      <CModal backdrop="static" alignment="center" size="sm" class="alertStyle" :visible="openAlertModal"
        @close="() => { openAlertModal = false }">
        <CModalHeader>
          <CModalTitle>Alert</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p class="text-center">
            <CIcon v-if="alertType === 'warn'" name="cil-Warning" size="3xl" style="color: #e37c00" />
            <CIcon v-else-if="alertType === 'ok'" name="cil-Check-Circle" size="3xl" style="color: green" />
            <CIcon v-else name="cil-XCircle" size="3xl" style="color: red" />
          </p>
          <p>
            {{ alertMsg }}
          </p>
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" @click="() => { openAlertModal = false }">Ok</CButton>
        </CModalFooter>
      </CModal>

      <CModal backdrop="static" size="lg" :visible="openTransactionModal" @close="() => { openTransactionModal = false }">
        <CModalHeader>
          <CModalTitle>Transactions</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTable align="middle" class="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>Date</CTableHeaderCell>
                <CTableHeaderCell class="text-right">Credit</CTableHeaderCell>
                <CTableHeaderCell class="text-right">Debit</CTableHeaderCell>
                <CTableHeaderCell class="text-right">Balance</CTableHeaderCell>
                <CTableHeaderCell class="text-left">Description</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody v-if="selectionTransactions.length > 0">
              <CTableRow v-for="item in selectionTransactions" :key="item.id">
                <CTableDataCell class="text-center">
                  {{ selectionTransactions.indexOf(item) + 1 }}
                </CTableDataCell>
                <CTableDataCell>
                  <div>{{ item.dateStr }}</div>
                </CTableDataCell>
                <CTableDataCell class="text-right">
                  <div>{{ (item.type === 'Credit' ? item.amount : 0).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) }}</div>
                </CTableDataCell>
                <CTableDataCell class="text-right">
                  <div>{{ (item.type === 'Debit' ? item.amount : 0).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) }}</div>
                </CTableDataCell>
                <CTableDataCell class="text-right">
                  <span>{{ item.newBalance.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) }}</span>
                </CTableDataCell>
                <CTableDataCell class="text-left">
                  <span>{{ item.description }}</span>
                </CTableDataCell>

              </CTableRow>
              <CTableRow> </CTableRow>
            </CTableBody>
          </CTable>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" @click="() => { openTransactionModal = false }">
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </div>

  </div>
</template>

<script>

import config from '@/config'
import spinner from '@/components/widgets/spinner.vue'
import moment from 'moment'
import { mapGetters } from "vuex";
import { CButton } from '@coreui/vue';


export default {
  name: 'Dashboard',
  title: 'Dashboard',
  components: {
    CButton,
    spinner
  },
  data() {
    return {
      disableButton: false,
      sending: false,
      loadingTransactions: false,
      alertMsg: '',
      alertType: '',
      openAddNewModal: false,
      openActivateCardModal: false,
      openAlertModal: false,
      openMapCardUserModal: false,
      openTransactionModal: false,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: 'Nigeria',
      cardNumber: '',
      countries: [
        'Select a country'
      ],
      activations: [],
      currentLocation: {},
      newPin: '',
      selectedCardNo: '',
      selectedCardOwner: '',
      tileTotal: 0,
      tileToday: 0,
      selectedActivation: {},
      selectionTransactions: [],
      locationLoading: true,
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
    this.getCurrentLocation();
  },
  watch: {
    openAddNewModal() {
      if (this.openAddNewModal === false) {
        // this.clearFields()
      }
    },
    openAlertModal() {
      if (this.openAlertModal === false) {
        this.alertMsg = ''
        this.alertType = ''
      }
    }
  },
  methods: {
    activateNew() {
      if (!this.validateEntry()) {
        this.alertMsg = 'Please complete all required fields before proceeding'
        this.alertType = 'warn'
        this.openAlertModal = true;
      }
      else {
        this.disableButton = true;
        this.sending = true
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
            this.disableButton = false;
            this.sending = false
            console.log('Activation response: ', res.data)
            this.getActivations();
            this.openAddNewModal = false
            this.alertMsg = `New User "${this.firstName} ${this.lastName}" activated successfully`
            this.alertType = 'ok'
            this.openAlertModal = true;
            this.clearFields();
          })
          .catch(err => {
            this.disableButton = false;
            this.sending = false
            if (err.response.data.message === 'Duplicate') {
              this.openAddNewModal = false
              this.openMapCardUserModal = true
            }
            else {
              console.log('Unable create new activation >> ', err.response);
              this.alertMsg = `${err.response.data.message}`
              this.alertType = ''
              this.openAlertModal = true;
            }
          })
      }
    },
    mapCardToExistingUser() {
      this.disableButton = true;
      this.sending = true
      this.axios.post(`${config.apiBaseUrl}/Activator/Map/${this.cardNumber}?username=${this.email}`, {}, this.authConfig)
        .then(() => {
          this.disableButton = false;
          this.sending = false
          // console.log('Activation response: ', res.data)
          this.getActivations();
          this.alertMsg = `New Remis card Mapped to user "${this.firstName} ${this.lastName}" successfully`
          this.alertType = 'ok'
          this.openMapCardUserModal = false;
          this.openAlertModal = true;
          this.clearFields();
        })
        .catch(err => {
          this.disableButton = false;
          this.sending = false
          console.log('Unable to Map card to User >> ', err.response);
          this.alertMsg = `${err.response.data.message}`
          this.alertType = ''
          this.openMapCardUserModal = true;
        })
    },
    clearFields() {
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.phone = ''
      this.country = ''
      this.cardNumber = ''
    },
    toggleActivateCard(id) {
      this.selectedUser = this.activations.filter(a => a.id === id)[0]
      this.openActivateCardModal = true;
    },
    toggleTransactions(id) {
      this.selectedUser = this.activations.filter(a => a.id === id)[0]
      console.log('Selection:: ', this.selectedUser.cardNumber)
      this.loadingTransactions = true;
      this.openTransactionModal = true;
      this.getCardTransaction();
    },
    activateCard() {
      this.disableButton = true;
      this.sending = true
      let model = {
        oldPin: '0000',
        newPin: this.newPin
      }
      this.axios.post(`${config.apiBaseUrl}/Activator/ActivateCard/${this.selectedUser.cardNumber}/${this.selectedUser.ownerId}`, model, this.authConfig)
        .then(res => {
          console.log('Activation response: ', res)
          this.selectedUser.cardActivated = true;
          this.openActivateCardModal = false

          this.disableButton = false;
          this.sending = false
          this.alertMsg = `New User Card "${this.selectedUser.cardNumber}" activated successfully`
          this.alertType = 'ok'
          this.openAlertModal = true;
          this.newPin = '';
        })
        .catch(err => {
          console.log('Unable to activate card', err.response);
          this.disableButton = false;
          this.sending = false
          this.alertMsg = `${err.response.data.message}`
          this.alertType = ''
          this.openAlertModal = true;
        })
    },
    getActivations() {
      this.axios.get(`${config.apiBaseUrl}/Activator/MyActivations`, this.authConfig)
        .then(res => {
          console.log(res.data)
          res.data.myActivations.forEach(e => {
            e.dateActivatedStr = moment(e.dateActivated).format('MMM DD, YYYY - h:m:a')
          });
          this.activations = res.data.myActivations;
          this.tileTotal = res.data.total;
          this.tileToday = res.data.today;
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
    getCurrentLocation() {
      this.locationLoading = true;
      this.axios.get(`${config.apiBaseUrl}/Activator/CurrentLocation`, this.authConfig)
        .then(res => {
          this.locationLoading = false;
          this.currentLocation = res.data;
          console.log(this.currentLocation)
        })
        .catch(() => {
          this.locationLoading = false;
          console.log('Unable to get currentLocation');
        })
    },
    getCardTransaction() {
      this.axios.get(`${config.apiBaseUrl}/Card/Details/${this.selectedUser.cardNumber}`, this.authConfig)
        .then(res => {
          this.selectionTransactions = res.data.data.transactions.data;
          console.log('This iss good :: ', this.selectionTransactions)
          this.selectionTransactions.forEach(e => {
            e.dateStr = moment(e.date).format('MMM DD, YYYY - h:m:a')
          });
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

<style lang="scss" scoped>
.card-tile {
  min-height: 101px;
}
</style>