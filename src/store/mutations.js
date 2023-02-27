import axios from 'axios'
import router from '@/router'
import config from '@/config'

export default {

    toggleSidebar(state) {
        state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
        state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
        state.sidebarVisible = payload.value
    },

    // User related
    setUserDetails(state, userDetails) {
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        state.userDetails = userDetails;
        state.authConfig = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "bearer " + userDetails.token,
            }
        };
        state.authConfigForUpload = {
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "*/*",
                Authorization: "bearer " + userDetails.token,
            },
        }
    },

    removeUser(state) {
        state.userDetails = null;
        localStorage.removeItem("userDetails")
    },
    logoutUser(state, header) {
        axios
            .post(`${config.apiBaseUrl}/Account/Logout`, {}, header)
            .then(() => {
                localStorage.removeItem("userDetails")
                state.userDetails = null;
                router.push({ name: "Login" });
            })
            .catch(err => {
                console.log("Unable to logout now, please check and try again", err);
            });
    }
}