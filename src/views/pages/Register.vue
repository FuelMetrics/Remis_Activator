<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="9" :lg="7" :xl="6">
          <CCard class="mx-4">
            <CCardBody class="p-4">
              <CForm>
                <h1>Register</h1>
                <p class="text-medium-emphasis">Create your account</p>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput placeholder="Username" autocomplete="username" />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput placeholder="Email" autocomplete="email" />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput type="password" placeholder="Password" autocomplete="new-password" />
                </CInputGroup>
                <CInputGroup class="mb-4">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput type="password" placeholder="Repeat password" autocomplete="new-password" />
                </CInputGroup>
                <div class="d-grid">
                  <CButton color="success">Create Account</CButton>
                </div>
                <div class="text-center">
                  <CButton color="link" class="px-0" @click="gotoLogin()">
                    Back to Login
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
</div>
</template>

<script>
import router from '@/router';

export default {
  name: 'Register',
  title: 'Register',

  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    gotoLogin() {
      router.push({ name: 'Login' })
    }
  }
}
</script>
