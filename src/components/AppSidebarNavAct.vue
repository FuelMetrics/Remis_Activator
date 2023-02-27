<template>
  <div>
    <ul class="sidebar-nav">
      <li class="nav-title">Control Panel</li>
      <li class="nav-item">
        <a class="nav-link" :class="$route.name === 'Dashboard' ? 'active' : ''" href="/dashboard">
          <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 512 512" role="img">undefined<path
              fill="var(--ci-primary-color, currentColor)"
              d="M425.706,142.294A240,240,0,0,0,16,312v88H160V368H48V312c0-114.691,93.309-208,208-208s208,93.309,208,208v56H352v32H496V312A238.432,238.432,0,0,0,425.706,142.294Z"
              class="ci-primary"></path>
            <rect width="32" height="32" x="80" y="264" fill="var(--ci-primary-color, currentColor)" class="ci-primary">
            </rect>
            <rect width="32" height="32" x="240" y="128" fill="var(--ci-primary-color, currentColor)" class="ci-primary">
            </rect>
            <rect width="32" height="32" x="136" y="168" fill="var(--ci-primary-color, currentColor)" class="ci-primary">
            </rect>
            <rect width="32" height="32" x="400" y="264" fill="var(--ci-primary-color, currentColor)" class="ci-primary">
            </rect>
            <path fill="var(--ci-primary-color, currentColor)"
              d="M297.222,335.1l69.2-144.173-28.85-13.848L268.389,321.214A64.141,64.141,0,1,0,297.222,335.1ZM256,416a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,416Z"
              class="ci-primary"></path>
          </svg>
          Dashboard
        </a>
      </li>
      <!-- <li class="nav-item">
                    <a class="nav-link" href="/Activators">
                      <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 512 512" role="img">undefined<path
                          fill="var(--ci-primary-color, currentColor)"
                          d="M112,192a48,48,0,1,0-48,48A48.055,48.055,0,0,0,112,192Zm-64,0a16,16,0,1,1,16,16A16.019,16.019,0,0,1,48,192Z"
                          class="ci-primary"></path>
                        <path fill="var(--ci-primary-color, currentColor)"
                          d="M320,240a48,48,0,1,0-48-48A48.055,48.055,0,0,0,320,240Zm0-64a16,16,0,1,1-16,16A16.019,16.019,0,0,1,320,176Z"
                          class="ci-primary"></path>
                        <path fill="var(--ci-primary-color, currentColor)"
                          d="M184,112a48,48,0,1,0-48-48A48.055,48.055,0,0,0,184,112Zm0-64a16,16,0,1,1-16,16A16.019,16.019,0,0,1,184,48Z"
                          class="ci-primary"></path>
                        <path fill="var(--ci-primary-color, currentColor)"
                          d="M448,144a48,48,0,1,0,48,48A48.055,48.055,0,0,0,448,144Zm0,64a16,16,0,1,1,16-16A16.019,16.019,0,0,1,448,208Z"
                          class="ci-primary"></path>
                        <path fill="var(--ci-primary-color, currentColor)"
                          d="M448,112a48,48,0,1,0-48-48A48.055,48.055,0,0,0,448,112Zm0-64a16,16,0,1,1-16,16A16.019,16.019,0,0,1,448,48Z"
                          class="ci-primary"></path>
                        <path fill="var(--ci-primary-color, currentColor)"
                          d="M320,112a48,48,0,1,0-48-48A48.055,48.055,0,0,0,320,112Zm0-64a16,16,0,1,1-16,16A16.019,16.019,0,0,1,320,48Z"
                          class="ci-primary"></path>
                        <path fill="var(--ci-primary-color, currentColor)"
                          d="M376,320a47.691,47.691,0,0,0-23.549,6.184,47.958,47.958,0,0,0-64-16A47.991,47.991,0,0,0,232,290.742V248a48,48,0,0,0-96,0v96.038A79.6,79.6,0,0,0,88,328a24.028,24.028,0,0,0-24,24V496H96V360.667A48.078,48.078,0,0,1,136,408v16h32V248a16,16,0,0,1,32,0V424h32V336a16,16,0,0,1,32,0v88h32V352a16,16,0,0,1,32,0v72h32V368a16,16,0,0,1,32,0V496h32V368A48.055,48.055,0,0,0,376,320Z"
                          class="ci-primary"></path>
                      </svg>
                      Activators
                    </a>
                  </li> -->
      <!-- <li class="nav-item">
            <a class="nav-link" :class="$route.name === 'Customers' ? 'active' : ''" aria-current="page" href="/Customers">
              <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 512 512" role="img">undefined<path
                  fill="var(--ci-primary-color, currentColor)"
                  d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"
                  class="ci-primary"></path>
                <path fill="var(--ci-primary-color, currentColor)"
                  d="M256,384A104,104,0,0,0,360,280H152A104,104,0,0,0,256,384Z" class="ci-primary"></path>
                <polygon fill="var(--ci-primary-color, currentColor)"
                  points="205.757 228.292 226.243 203.708 168 155.173 109.757 203.708 130.243 228.292 168 196.827 205.757 228.292"
                  class="ci-primary"></polygon>
                <polygon fill="var(--ci-primary-color, currentColor)"
                  points="285.757 203.708 306.243 228.292 344 196.827 381.757 228.292 402.243 203.708 344 155.173 285.757 203.708"
                  class="ci-primary"></polygon>
              </svg>
              Acquired Customers
            </a>
          </li> -->
    </ul>
</div>
</template>

<script>
export default {
  name: 'sidebar',
  props: ['currentP'],
  data() {
    return {

    }
  }
}
</script>


// import { defineComponent, h, onMounted, ref, resolveComponent } from 'vue'
// import { RouterLink, useRoute } from 'vue-router'

// import {
//   CBadge,
//   CSidebarNav,
//   CNavItem,
//   CNavGroup,
//   CNavTitle,
// } from '@coreui/vue'
// // import nav from '@/_nav.js'
// import nav from '@/_activatorNav.js'

// const normalizePath = (path) =>
//   decodeURI(path)
//     .replace(/#.*$/, '')
//     .replace(/(index)?\.(html)$/, '')

// const isActiveLink = (route, link) => {
//   if (link === undefined) {
//     return false
//   }

//   if (route.hash === link) {
//     return true
//   }

//   const currentPath = normalizePath(route.path)
//   const targetPath = normalizePath(link)

//   return currentPath === targetPath
// }

// const isActiveItem = (route, item) => {
//   if (isActiveLink(route, item.to)) {
//     return true
//   }

//   if (item.items) {
//     return item.items.some((child) => isActiveItem(route, child))
//   }

//   return false
// }

// const AppSidebarNav = defineComponent({
//   name: 'AppSidebarNav',
//   components: {
//     CNavItem,
//     CNavGroup,
//     CNavTitle,
//   },
//   setup() {
//     const route = useRoute()
//     const firstRender = ref(true)

//     onMounted(() => {
//       firstRender.value = false
//     })

//     const renderItem = (item) => {
//       if (item.items) {
//         return h(
//           CNavGroup,
//           {
//             ...(firstRender.value && {
//               visible: item.items.some((child) => isActiveItem(route, child)),
//             }),
//           },
//           {
//             togglerContent: () => [
//               h(resolveComponent('CIcon'), {
//                 customClassName: 'nav-icon',
//                 name: item.icon,
//               }),
//               item.name,
//             ],
//             default: () => item.items.map((child) => renderItem(child)),
//           },
//         )
//       }

//       return item.to
//         ? h(
//           RouterLink,
//           {
//             to: item.to,
//             custom: true,
//           },
//           {
//             default: (props) =>
//               h(
//                 resolveComponent(item.component),
//                 {
//                   active: props.isActive,
//                   href: props.href,
//                   onClick: () => props.navigate(),
//                 },
//                 {
//                   default: () => [
//                     item.icon &&
//                     h(resolveComponent('CIcon'), {
//                       customClassName: 'nav-icon',
//                       name: item.icon,
//                     }),
//                     item.name,
//                     item.badge &&
//                     h(
//                       CBadge,
//                       {
//                         class: 'ms-auto',
//                         color: item.badge.color,
//                       },
//                       {
//                         default: () => item.badge.text,
//                       },
//                     ),
//                   ],
//                 },
//               ),
//           },
//         )
//         : h(
//           resolveComponent(item.component),
//           {},
//           {
//             default: () => item.name,
//           },
//         )
//     }

//     return () =>
//       h(
//         CSidebarNav,
//         {},
//         {
//           default: () => nav.map((item) => renderItem(item)),
//         },
//       )
//   },
// })
// export { AppSidebarNav }
