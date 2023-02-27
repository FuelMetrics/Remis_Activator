import { h, resolveComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'
const _userDetails = JSON.parse(localStorage.getItem("userDetails"));

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => {
          return import('@/views/Dashboard.vue')
          // let userDetails = _userDetails === null || _userDetails === undefined
          //   ? JSON.parse(localStorage.getItem("userDetails"))
          //   : _userDetails;
          // if (userDetails.currentProfile === "ActivatorSupervisor") {
          //   return import('@/views/Dashboard.vue');
          // } else {
          //   return import('@/views/ActivatorDashboard.vue');
          // }
        },
        meta: {
          authorize: true,
          authRoles: ["Activator", "ActivatorSupervisor"],
        },
      },
      {
        path: '/Activators',
        name: 'Activators',
        component: () => import('@/views/Activator/Activators.vue'),
        meta: {
          authorize: true,
          authRoles: ["ActivatorSupervisor"],
        },
      },
      {
        path: '/Customers',
        name: 'Customers',
        component: () => {
          let userDetails = _userDetails === null || _userDetails === undefined
            ? JSON.parse(localStorage.getItem("userDetails"))
            : _userDetails;
          if (userDetails.currentProfile === "ActivatorSupervisor") {
            return import('@/views/Customers/List.vue');
          } else {
            return import('@/views/Customers/MyList.vue');
          }
        },
        meta: {
          authorize: true,
          authRoles: ["Activator", "ActivatorSupervisor"],
        },
      },
      // {
      //   path: '/theme',
      //   name: 'Theme',
      //   redirect: '/theme/typography',
      // },
      {
        path: '/theme/colors',
        name: 'Colors',
        component: () => import('@/views/theme/Colors.vue'),
      },
      {
        path: '/theme/typography',
        name: 'Typography',
        component: () => import('@/views/theme/Typography.vue'),
      },
      {
        path: '/base',
        name: 'Base',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/base/breadcrumbs',
        children: [
          {
            path: '/base/accordion',
            name: 'Accordion',
            component: () => import('@/views/base/Accordion.vue'),
          },
          {
            path: '/base/breadcrumbs',
            name: 'Breadcrumbs',
            component: () => import('@/views/base/Breadcrumbs.vue'),
          },
          {
            path: '/base/cards',
            name: 'Cards',
            component: () => import('@/views/base/Cards.vue'),
          },
          {
            path: '/base/carousels',
            name: 'Carousels',
            component: () => import('@/views/base/Carousels.vue'),
          },
          {
            path: '/base/collapses',
            name: 'Collapses',
            component: () => import('@/views/base/Collapses.vue'),
          },
          {
            path: '/base/list-groups',
            name: 'List Groups',
            component: () => import('@/views/base/ListGroups.vue'),
          },
          {
            path: '/base/navs',
            name: 'Navs',
            component: () => import('@/views/base/Navs.vue'),
          },
          {
            path: '/base/paginations',
            name: 'Paginations',
            component: () => import('@/views/base/Paginations.vue'),
          },
          {
            path: '/base/placeholders',
            name: 'Placeholders',
            component: () => import('@/views/base/Placeholders.vue'),
          },
          {
            path: '/base/popovers',
            name: 'Popovers',
            component: () => import('@/views/base/Popovers.vue'),
          },
          {
            path: '/base/progress',
            name: 'Progress',
            component: () => import('@/views/base/Progress.vue'),
          },
          {
            path: '/base/spinners',
            name: 'Spinners',
            component: () => import('@/views/base/Spinners.vue'),
          },
          {
            path: '/base/tables',
            name: 'Tables',
            component: () => import('@/views/base/Tables.vue'),
          },
          {
            path: '/base/tooltips',
            name: 'Tooltips',
            component: () => import('@/views/base/Tooltips.vue'),
          },
        ],
      },
      {
        path: '/buttons',
        name: 'Buttons',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/buttons/standard-buttons',
        children: [
          {
            path: '/buttons/standard-buttons',
            name: 'Buttons',
            component: () => import('@/views/buttons/Buttons.vue'),
          },
          {
            path: '/buttons/dropdowns',
            name: 'Dropdowns',
            component: () => import('@/views/buttons/Dropdowns.vue'),
          },
          {
            path: '/buttons/button-groups',
            name: 'Button Groups',
            component: () => import('@/views/buttons/ButtonGroups.vue'),
          },
        ],
      },
      {
        path: '/forms',
        name: 'Forms',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/forms/form-control',
        children: [
          {
            path: '/forms/form-control',
            name: 'Form Control',
            component: () => import('@/views/forms/FormControl.vue'),
          },
          {
            path: '/forms/select',
            name: 'Select',
            component: () => import('@/views/forms/Select.vue'),
          },
          {
            path: '/forms/checks-radios',
            name: 'Checks & Radios',
            component: () => import('@/views/forms/ChecksRadios.vue'),
          },
          {
            path: '/forms/range',
            name: 'Range',
            component: () => import('@/views/forms/Range.vue'),
          },
          {
            path: '/forms/input-group',
            name: 'Input Group',
            component: () => import('@/views/forms/InputGroup.vue'),
          },
          {
            path: '/forms/floating-labels',
            name: 'Floating Labels',
            component: () => import('@/views/forms/FloatingLabels.vue'),
          },
          {
            path: '/forms/layout',
            name: 'Layout',
            component: () => import('@/views/forms/Layout.vue'),
          },
          {
            path: '/forms/validation',
            name: 'Validation',
            component: () => import('@/views/forms/Validation.vue'),
          },
        ],
      },
      {
        path: '/charts',
        name: 'Charts',
        component: () => import('@/views/charts/Charts.vue'),
      },
      {
        path: '/icons',
        name: 'Icons',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/icons/coreui-icons',
        children: [
          {
            path: '/icons/coreui-icons',
            name: 'CoreUI Icons',
            component: () => import('@/views/icons/CoreUIIcons.vue'),
          },
          {
            path: '/icons/brands',
            name: 'Brands',
            component: () => import('@/views/icons/Brands.vue'),
          },
          {
            path: '/icons/flags',
            name: 'Flags',
            component: () => import('@/views/icons/Flags.vue'),
          },
        ],
      },
      {
        path: '/notifications',
        name: 'Notifications',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/notifications/alerts',
        children: [
          {
            path: '/notifications/alerts',
            name: 'Alerts',
            component: () => import('@/views/notifications/Alerts.vue'),
          },
          {
            path: '/notifications/badges',
            name: 'Badges',
            component: () => import('@/views/notifications/Badges.vue'),
          },
          {
            path: '/notifications/modals',
            name: 'Modals',
            component: () => import('@/views/notifications/Modals.vue'),
          },
        ],
      },
      {
        path: '/widgets',
        name: 'Widgets',
        component: () => import('@/views/widgets/Widgets.vue'),
      },
    ],
  },
  // {
  //   path: "*",
  //   name: "NotFound",
  //   component: () => import("../views/pages/Page404"),
  // },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
      },
      {
        path: '500',
        name: 'Page500',
        component: () => import('@/views/pages/Page500'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/pages/Login'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/pages/Register'),
      },
    ],
  },
  {
    path: '/Account',
    name: 'Account',
    redirect: '/pages/404',
    meta: {
      guest: true,
    },
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: 'Login',
        name: 'Login',
        component: () => import('@/views/pages/Login'),
        meta: {
          guest: true,
          blockWhenLogin: true
        },
      },
      {
        path: 'Register',
        name: 'Register',
        component: () => import('@/views/pages/Register'),
        meta: {
          guest: true,
          blockWhenLogin: true
        },
      },
      {
        path: 'ForgotPassword',
        name: 'ForgotPassword',
        component: () => import('@/views/pages/ForgotPassword'),
        meta: {
          guest: true,
          blockWhenLogin: true
        },
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(), //process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((rec) => rec.meta.authorize)) {
    console.log('Authorized pages')
    if (!localStorage.getItem('userDetails') || localStorage.getItem('userDetails') == null || localStorage.getItem('userDetails' == 'null')) {
      console.log('No login user, Goto Login')
      next({ name: 'Login', params: { nextUrl: to.fullPath } })
    } else {
      console.log('a user is logged in >> ', to.name)
      let user = JSON.parse(localStorage.getItem('userDetails'))
      console.log('x1')
      if (to.meta.authRoles.includes('ActivatorSupervisor')
        && user.roles.includes('ActivatorSupervisor')) {
        console.log('x2')
        next()
      }
      else if (to.name !== 'ChangePassword' && user.forcePasswordChange) {
        console.log('ChangePassword >>> ')
        next({ name: 'ChangePassword' })
      }
      else {
        console.log('x3')
        if (to.meta.authRoles.length === 0) {
          console.log('x4')
          //.includes('Supervisor')) && user.roles.includes('Supervisor'))
          next()
        } //if (to.matched.some((rec) => rec.meta.authRoles.includes('Company')) &&  user.roles.includes('Company'))
        else {
          console.log('x5')
          let allow = false
          to.meta.authRoles.forEach((e) => {
            if (user.roles.includes(e)) {
              allow = true
            }
          })
          if (allow) {
            next()
          } else {
            console.log('No match for me')
            next({ name: 'NotAllowed' })
          }
        }
        // else {
        //     console.log('No match for me')
        //     next({ name: 'NotAllowed' })
        // }
      }
    }
  }
  else if (to.matched.some((rec) => rec.meta.guest)) {
    console.log(JSON.parse(localStorage.getItem('userDetails')))
    if (to.matched.some((rec) => rec.meta.blockWhenLogin)) {
      console.log('goto auth page');
      if (localStorage.getItem('userDetails') !== null && JSON.parse(localStorage.getItem('userDetails') !== null)) {
        next({ name: 'Dashboard' })
      }
      else //if (
      //   localStorage.getItem('userDetails') ||
      //   localStorage.getItem('userDetails') !== null ||
      //   localStorage.getItem('userDetails') !== 'null'
      // )
      {
        next()
      }
    }
    next()
  }
  else {
    // Open pages
    next()
    // let user = JSON.parse(localStorage.getItem('userDetails'))
    // if (user.roles.includes('Company') && !user.isActive) {
    //   next({ name: 'Onboard' })
    // } else {
    //   next()
    // }
  }
})

export default router
