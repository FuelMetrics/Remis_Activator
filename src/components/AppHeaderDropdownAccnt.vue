<template>
  <CDropdown variant="nav-item">
    <CDropdownToggle placement="bottom-end" class="py-0" :caret="false">
      <CAvatar :src="avatar" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownItem @click="logout()">
        <CIcon icon="cil-lock-locked" /> Logout
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script>
import config from '@/config'
import router from '@/router'
import { mapGetters } from "vuex";
import avatar from '@/assets/images/avatar2.jpg'
export default {
  name: 'AppHeaderDropdownAccnt',
  setup() {
    return {
      avatar: avatar,
      itemsCount: 42,
    }
  },
  computed: {
    ...mapGetters({
      authConfig: "getAuthConfig",
    }),
  },
  methods: {
    logout() {
      // alert('Logout not');
      this.axios
        .post(`${config.apiBaseUrl}/Account/Logout`, {}, this.authConfig)
        .then(() => {
          // localStorage.removeItem("userDetails");
          // state.userDetails = null;
          this.$store.commit("removeUser");
          router.push({ name: "Login" });
        })
        .catch(err => {
          console.log("Unable to logout now, please check and try again", err.response.status);
          if (err.response.status === 401) {
            this.$store.commit("removeUser");
            router.push({ name: "Login" });
            // this.$store.commit("logoutUser", this.authConfig);
          }
        });
    }
  }
}
</script>
