import { createStore } from 'vuex'
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
    userDetails: null,
    currentProfile: '',
    check: false,
    authConfig: null,
    authConfigForUpload: null,

  },
  getters,
  mutations,
  // mutations: {
  //   toggleSidebar(state) {
  //     state.sidebarVisible = !state.sidebarVisible
  //   },
  //   toggleUnfoldable(state) {
  //     state.sidebarUnfoldable = !state.sidebarUnfoldable
  //   },
  //   updateSidebarVisible(state, payload) {
  //     state.sidebarVisible = payload.value
  //   },
  // },
  actions,
  modules: {},
})
