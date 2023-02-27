<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">Sign In to your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput placeholder="Username" v-model="email" />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput type="password" autocomplete="off" placeholder="Password" v-model="password" />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" class="px-4" @click="login()" type="button" :disabled="disableButton"
                        :class="disableButton || sending ? 'disabled' : ''">
                        <span class="mb-0" v-if="!sending">Login
                          <!-- <CIcon size="sm" :name="'cilPlus'" /> -->
                        </span>
                        <span v-else-if="sending" :class="sending ? 'wait' : ''">
                          Please wait
                          <spinner />
                        </span>
                      </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0" @click="gotoForgotPassword()">
                        Forgot password?
                      </CButton>
                    </CCol>
                    <CCol :xs="12" class="text-center mt-5 text-danger">
                      <p>
                        {{ errMsg }}
                      </p>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>

                  </p>
                  <CButton color="light" variant="outline" class="mt-3" @click="gotoRegister()">
                    Register Now!
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
    <!-- <CAlert color="warning" dismissible @close="alert">
                                          <strong>Go right ahead</strong> and click that dimiss over there on the right.
                                        </CAlert> -->
  </div>
</template>

<script>
import config from "@/config";
import router from "@/router";
import spinner from '@/components/widgets/spinner.vue'
export default {
  name: 'Login',
  title: 'Login',
  components: {
    spinner
  },
  data() {
    return {
      alertMsg: '',
      email: '',
      password: '',
      disableButton: false,
      sending: false,
      errMsg: ''
    }
  },
  mounted() {

  },
  methods: {

    login() {
      if (!this.email || this.email.length <= 0 || !this.password || this.password.length <= 0) {
        this.alertMsg = 'Please complete all fields'
      }
      else {
        this.disableButton = true;
        this.sending = true;
        this.errMsg = ''
        let data = {
          email: this.email,
          password: this.password,
        };
        this.axios
          .post(`${config.apiBaseUrl}/Login`, data)
          .then(async (response) => {
            // sessionStorage.setItem('userEmail', this.email);
            this.disableButton = false;
            this.sending = false;
            this.$store.commit("setUserDetails", response.data);
            router.push({ name: "Dashboard" });
          })
          .catch(() => {
            this.disableButton = false;
            this.sending = false;
            this.errMsg = 'Invalid login attempt!'

            //', {
            //   title: `Login`,
            //   variant: "danger",
            //   solid: true,
            //   autoHideDelay: 4000,
            // });
          });
      }
    },
    login1() {
      this.disableButton = true;
      this.sending = true;
    },
    gotoRegister() {
      router.push({ name: 'Register' })
    },
    gotoForgotPassword() {
      router.push({ name: 'ForgotPassword' })
    },
  }
}
</script>
