<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <CHeaderBrand class="mx-auto d-lg-none" to="/">
        <CIcon :icon="logo" height="48" alt="Logo" />
      </CHeaderBrand>
      <!-- <CHeaderNav class="d-none d-md-flex me-auto">
                      <CNavItem>
                        <CNavLink href="/dashboard"> Dashboard </CNavLink>
                      </CNavItem>
                      <CNavItem>
                        <CNavLink href="#">Users</CNavLink>
                      </CNavItem>
                      <CNavItem>
                        <CNavLink href="#">Settings</CNavLink>
                      </CNavItem>
                    </CHeaderNav> -->
      <CHeaderNav>
        <CNavItem>
          <CNavLink href="#">
            <CIcon class="mx-2" icon="cil-bell" size="lg" />
          </CNavLink>
        </CNavItem>
        <AppHeaderDropdownAccnt />
      </CHeaderNav>
    </CContainer>
    <!-- <CHeaderDivider /> -->
    <!-- <CContainer fluid>
                <AppBreadcrumb />
              </CContainer> -->
  </CHeader>
</template>

<script>
// import AppBreadcrumb from './AppBreadcrumb'
import AppHeaderDropdownAccnt from './AppHeaderDropdownAccnt'
// import { logo } from '@/assets/brand/logo'
import logo from '@/assets/brand/new_remis_fulllogo_white.png'
export default {
  name: 'AppHeader',
  components: {
    // AppBreadcrumb,
    AppHeaderDropdownAccnt,
  },
  setup() {
    return {
      logo,
    }
  },
}
</script>
