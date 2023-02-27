import { jwt_decode } from "vue-jwt-decode";

// let token;

// let configObject = {



//     authConfig: configObjectFunc,
//     authConfigForUpload: configObjectForUploadFunc,
//     authConfigForDownload: configObjectForDownloadFunc,
// };

// function configObjectFunc() {
//     let user = localStorage.getItem("userDetails");
//     if (user !== null) {
//         token = JSON.parse(localStorage.getItem("userDetails")).token;
//     } else {
//         token = null;
//     }
//     if (token) {
//         let exp;
//         if (localStorage.getItem("jwtExpiry")) {
//             exp = localStorage.getItem("jwtExpiry");
//         } else {
//             const decoded = jwt_decode(token);
//             exp = decoded.exp * 1000;
//         }

//         const now = Date.now();
//         if (now > exp) {
//             localStorage.clear();
//             if (window.location.origin !== window.location.href) {
//                 window.location.href = window.location.origin;
//             }
//         }

//         return {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: "bearer " + token,
//                 Accept: "application/json",
//             },
//         };
//     } else {
//         return null;
//     }
// }

// function configObjectForUploadFunc() {
//     if (localStorage.getItem("userDetails")) {
//         token = JSON.parse(localStorage.getItem("userDetails")).token;
//     } else {
//         token = null;
//     }

//     if (token) {
//         let exp;
//         if (localStorage.getItem("jwtExpiry")) {
//             exp = localStorage.getItem("jwtExpiry");
//         } else {
//             const decoded = jwt_decode(token);
//             exp = decoded.exp * 1000;
//         }

//         const now = Date.now();
//         if (now > exp) {
//             localStorage.clear();
//             if (window.location.origin !== window.location.href) {
//                 window.location.href = window.location.origin;
//             }
//         }

//         return {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//                 Authorization: "bearer " + token,
//                 Accept: "*/*",
//             },
//         };
//     } else {
//         return null;
//     }
// }

// function configObjectForDownloadFunc() {
//     if (localStorage.getItem("userDetails")) {
//         token = JSON.parse(localStorage.getItem("userDetails")).token;
//     } else {
//         token = null;
//     }

//     if (token) {
//         let exp;
//         if (localStorage.getItem("jwtExpiry")) {
//             exp = localStorage.getItem("jwtExpiry");
//         } else {
//             const decoded = jwt_decode(token);
//             exp = decoded.exp * 1000;
//         }

//         const now = Date.now();
//         if (now > exp) {
//             localStorage.clear();
//             if (window.location.origin !== window.location.href) {
//                 window.location.href = window.location.origin;
//             }
//         }

//         return {
//             headers: {
//                 "Content-Type": "*/*",
//                 Authorization: "bearer " + token,
//                 Accept: "*/*",
//                 responseType: "blob",
//                 //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
//             },
//         };
//     } else {
//         return null;
//     }
// }

export default {
    apiBaseUrl: process.env.VUE_APP_APIURL,
    authConfig: () => {
        let user = localStorage.getItem("userDetails");
        let token = null

        if (user !== null) {
            token = JSON.parse(localStorage.getItem("userDetails")).token;
        } else {
            token = null;
        }
        if (token) {
            let exp;
            const decoded = jwt_decode(token);
            exp = decoded.exp * 1000;
            // if (localStorage.getItem("jwtExpiry")) {
            //     exp = localStorage.getItem("jwtExpiry");
            // } else {
            //     const decoded = jwt_decode(token);
            //     exp = decoded.exp * 1000;
            // }

            const now = Date.now();
            if (now > exp) {
                localStorage.clear();
                if (window.location.origin !== window.location.href) {
                    window.location.href = window.location.origin;
                }
            }
            else {
                return {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "bearer " + token,
                        Accept: "application/json",
                    },
                };
            }
        } else {
            return {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "bearer ",
                    Accept: "application/json",
                }
            }
        }
    }
}
