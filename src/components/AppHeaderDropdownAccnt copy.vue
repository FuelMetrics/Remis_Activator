<template>
  <CDropdown variant="nav-item">
    <CDropdownToggle placement="bottom-end" class="py-0" :caret="false">
      <CAvatar :src="avatar" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <!-- <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
                                                Account
                                              </CDropdownHeader>
                                              <CDropdownItem>
                                                <CIcon icon="cil-bell" /> Updates
                                                <CBadge color="info" class="ms-auto">{{ itemsCount }}</CBadge>
                                              </CDropdownItem>
                                              <CDropdownItem>
                                                <CIcon icon="cil-envelope-open" /> Messages
                                                <CBadge color="success" class="ms-auto">{{ itemsCount }}</CBadge>
                                              </CDropdownItem>
                                              <CDropdownItem>
                                                <CIcon icon="cil-task" /> Tasks
                                                <CBadge color="danger" class="ms-auto">{{ itemsCount }}</CBadge>
                                              </CDropdownItem>
                                              <CDropdownItem>
                                                <CIcon icon="cil-comment-square" /> Comments
                                                <CBadge color="warning" class="ms-auto">{{ itemsCount }}</CBadge>
                                              </CDropdownItem>
                                              <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
                                                Settings
                                              </CDropdownHeader>
                                              <CDropdownItem> <CIcon icon="cil-user" /> Profile </CDropdownItem>
                                              <CDropdownItem> <CIcon icon="cil-settings" /> Settings </CDropdownItem>
                                              <CDropdownItem>
                                                <CIcon icon="cil-dollar" /> Payments
                                                <CBadge color="secondary" class="ms-auto">{{ itemsCount }}</CBadge>
                                              </CDropdownItem>
                                              <CDropdownItem>
                                                <CIcon icon="cil-file" /> Projects
                                                <CBadge color="primary" class="ms-auto">{{ itemsCount }}</CBadge>
                                              </CDropdownItem>
                                              <CDropdownDivider />
                                              <CDropdownItem>
                                                <CIcon icon="cil-shield-alt" /> Lock Account
                                              </CDropdownItem> -->
      <CDropdownItem @click="logout()">
        <CIcon icon="cil-lock-locked" /> Logout
      </CDropdownItem>
      <li class="nav-item dropdown">
        <a active="false" class="nav-link py-0" disabled="false" href="#" placement="bottom-end">
          <div class="avatar avatar-md undefined"><img src="/img/avatar2.a6376883.jpg" class="avatar-img"><!----></div>
        </a>
      </li>
      </div>
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
