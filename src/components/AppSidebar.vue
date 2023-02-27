<template>
  <CSidebar position="fixed" :unfoldable="sidebarUnfoldable" :visible="sidebarVisible" @visible-change="
    (event) =>
      $store.commit({
        type: 'updateSidebarVisible',
        value: event,
      })">
    <CSidebarBrand>
      <CImage class="brand-logo" fluid :src="logo" :style="'opaciity: 0.7;'" />
      <!-- <CIcon custom-class-name="sidebar-brand-full" :icon="logo" :height="35" />
                                  <CIcon custom-class-name="sidebar-brand-narrow" :icon="sygnet" :height="35" /> -->
    </CSidebarBrand>
    <AppSidebarNav v-if="currentProfile === 'ActivatorSupervisor'" />
    <AppSidebarNavAct v-else />
    <!-- <CSidebarToggler class="d-none d-lg-flex" @click="$store.commit('toggleUnfoldable')" /> -->
</CSidebar>
</template>

<script>
import { computed } from 'vue'
import { useStore, mapGetters } from 'vuex'
import { AppSidebarNav } from './AppSidebarNav'
import AppSidebarNavAct from './AppSidebarNavAct'
// import { logoNegative } from '@/assets/brand/logo-negative'
import logo from '@/assets/brand/new_remis_fulllogo_white.png'
import { sygnet } from '@/assets/brand/sygnet'
export default {
  name: 'AppSidebar',
  components: {
    AppSidebarNav,
    AppSidebarNavAct
  },
  setup() {
    const store = useStore()
    return {
      // logoNegative,
      logo,
      sygnet,
      sidebarUnfoldable: computed(() => store.state.sidebarUnfoldable),
      sidebarVisible: computed(() => store.state.sidebarVisible),
      // currentProfile: computed(() => store.state.currentProfile),
    }
  },
  computed: {
    ...mapGetters({
      currentProfile: "getCurrentProfile",
    }),
  },
}
</script>
