<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Forgot Password</h1>
                  <p class="text-medium-emphasis">Reset your account password</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput placeholder="Username" />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" class="px-4" @click="resetPassword()"> Reset Password </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0" @click="gotoLogin()">
                        Back to Login?
                      </CButton>
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
</div>
</template>

<script>
import { config } from "@/config";
import router from "@/router";
export default {
  name: 'Login',
  title: 'Login',
  components: {

  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

    resetPassword($event) {
      $event.preventDefault();
      this.disableButton = true;
      this.sending = true;
      let data = {
        email: this.email,
        password: this.password,
      };
      this.axios
        .post(`${config.apiBaseUrl}/Login`, data)
        .then(async (response) => {
          this.disableButton = false;
          sessionStorage.setItem('userEmail', this.email);
          this.sending = false;
          this.$store.commit("setUserDetails", response.data);
          this.$bvToast.toast("Login Successful! Redirecting...", {
            title: `Login`,
            variant: "success",
            solid: true,
            autoHideDelay: 4000,
          });

          if (response.data.key) {
            this.$router.push({ path: "/ChooseProfile" });
          } else {
            this.$router.push({ path: "/Dashboard" });
          }
        })
        .catch(() => {
          this.disableButton = false;
          this.sending = false;
          this.$bvToast.toast("Invalid login attempt!", {
            title: `Login`,
            variant: "danger",
            solid: true,
            autoHideDelay: 4000,
          });
        });
    },
    gotoLogin() {
      router.push({ name: 'Login' })
    },
  }
}
</script>
