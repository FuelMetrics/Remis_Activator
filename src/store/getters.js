// import Vue from "vue";
// import configObject from "@/config";
// import axios from "axios";


export default {
    // User Details
    getUserDetails(state) {
        let usd = state.userDetails;
        if (usd !== null && usd !== undefined) {
            return usd;
        } else {
            return JSON.parse(localStorage.getItem("userDetails"));
        }
    },

    // User Current Profile
    getUserCurrentProfile() {
        return JSON.parse(localStorage.getItem("userDetails")).currentProfile;
    },

    // User Country
    getCountry({ commit }, state) {
        if (state.userDetails) {
            return state.userDetails.country.name;
        }
        else {
            commit('setUserdetails', localStorage.getItem("userDetails"));
            return JSON.parse(localStorage.getItem("userDetails")).country.name;
        }
    },
    // User Profiles
    getUserProfilesList(state) {
        let usd = state.userDetails;
        if (usd !== null && usd !== undefined) {
            return usd.profiles;
        } else {
            return JSON.parse(localStorage.getItem("userDetails")).profiles;
        }
        // return state.userDetails.profiles;
    },
    getCurrentProfile(state) {
        if (
            state.currentProfile !== null &&
            state.currentProfile !== undefined &&
            state.currentProfile.length > 0
        ) {
            return state.currentProfile;
        } else {
            return JSON.parse(localStorage.getItem("userDetails")).currentProfile;
        }
    },
    getAuthConfig() {
        const ud = JSON.parse(localStorage.getItem("userDetails"))
        return {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "bearer " + ud.token,
            }
        };
    },
    getAuthConfigForUpload() {
        const ud = JSON.parse(localStorage.getItem("userDetails"))
        return {
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "*/*",
                Authorization: "bearer " + ud.token,
            }
        };
    }
};