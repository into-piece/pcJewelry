/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 01:25:39
 * @LastEditTime: 2019-08-17 10:55:56
 * @LastEditors: Please set LastEditors
 */
export default [
  {
    path: '/403',
    component: './Exception/403',
  },
  {
    path: '/404',
    component: './Exception/404',
  },
  {
    path: '/500',
    component: './Exception/500',
  },
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },

      {
        component: '404',
      },
    ],
  },
  {
    path: '/introduce',
    component: '../layouts/introduce',
    routes: [
      // { path: '/introduce', redirect: '/introduce' },
      { path: '/introduce', name: 'introduce', component: './User/introduce' },
      // { path: '/user/register', name: 'register', component: './User/Register' },
      // {
      //   path: '/user/register-result',
      //   name: 'register.result',
      //   component: './User/RegisterResult',
      // },
      // {
      //   component: '404',
      // },
    ],
  },

  {
    path: '/opration',
    component: '../layouts/introduce',
    routes: [
      { path: '/opration', name: 'opration', component: './User/opration' },
    ],
  },

  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    // authority: ['admin', 'user', 'chents'],
    routes: [
      // dashboard
      { path: '/', redirect: '/business/client' },

      // bussiness route
      {
        path: '/business',
        icon: 'code',
        name: 'business',

        routes: [
          {
            path: '/business/client',
            name: 'client',
            icon: 'user',
            component: './Business/Client/ClientView',

            routes: [
              {
                path: '/business/client',
                redirect: '/business/client/emptyView',
              },
              {
                path: '/business/client/emptyView',
                component: './Business/Client/EmptyView',
              },
              {
                path: '/business/client/client',
                component: './Business/Client/ClientInfo',
              },
              {
                path: '/business/client/terminal',
                component: './Business/Client/TerminalClient',
              },
              {
                path: '/business/client/product',
                component: './Business/Client/Product',
              },

              {
                path: '/business/client/marking',
                component: './Business/Client/Mark',
              },
              {
                path: '/business/client/package',
                component: './Business/Client/PackageInfo',
              },
              {
                path: '/business/client/history',
                component: './Business/Client/History',
              },
            ],
          },
          {
            path: '/business/basic',
            name: 'basic',
            icon: 'bulb',
            component: './Business/Basic/Info',
            routes: [
              {
                path: '/business/basic',
                redirect: '/business/basic/base',
              },
              {
                path: '/business/basic/base',
                component: './Business/Basic/Brand',
              },
              {
                path: '/business/basic/security',
                component: './Business/Basic/SecurityView',
              },
              {
                path: '/business/basic/binding',
                component: './Business/Basic/BindingView',
              },
              {
                path: '/business/basic/notification',
                component: './Business/Basic/NotificationView',
              },
              {
                path: '/business/basic/brand',
                component: './Business/Basic/Brand',
                routes: [
                  {
                    path: '/business/basic/brand',
                    redirect: '/business/basic/brand/from',
                  },
                ],
              },
              {
                path: '/business/basic/requested',
                component: './Business/Basic/Requested',
              },
              {
                path: '/business/basic/sendWay',
                component: './Business/Basic/SendWay',
              },
              {
                path: '/business/basic/royalty',
                component: './Business/Basic/Royalty',
              },
              {
                path: '/business/basic/ring',
                component: './Business/Basic/RingNum',
              },
              {
                path: '/business/basic/currency',
                component: './Business/Basic/Currency',
              },
            ],
          },
          {
            path: '/business/product',
            name: 'product',
            icon: 'shopping',
            component: './Business/Product/ProductInfo',
            routes: [],
          },

          {
            path: '/business/specimen',
            name: 'specimen',
            icon: 'form',
            component: './Business/Specimen/Specimen',
            routes: [],
          },
          {
            path: '/business/quote',
            name: 'quote',
            icon: 'form',
            component: './Business/Quote',
            routes: [],
          },
          {
            path: '/business/proforminvoice',
            name: 'proforminvoice',
            icon: 'form',
            component: './Business/Proforminvoice/Proforminvoice',
            routes: [],
          },

          {
            path: '/business/deliver',
            name: 'deliver',
            icon: 'form',
            component: './Business/Deliver/Deliver',
            routes: [],
          },

          {
            path: '/business/receiving',
            name: 'receiving',
            icon: 'form',
            component: './Business/Receiving/Receiving',
            routes: [],
          },

          {
            path: '/business/report',
            name: 'report',
            icon: 'form',
            component: './Business/Report/Report',
            routes: [],
          },
        ],
      },


      // dev route
      {
        path: '/dev',
        icon: 'form',
        name: 'dev',
        routes: [
          {
            path: '/dev/basic',
            name: 'basic',
            icon: 'bulb',
            component: './dev/Basic',
          },
          //模具设定
          {
            path: '/dev/Mould',
            name: 'Mould',
            icon: 'inbox',
            component: './dev/Mould',
          },
          //原料设定
          {
            path: '/dev/Raw',
            name: 'Raw',
            icon: 'inbox',
            component: './dev/Raw',
          },
          {
            path: '/dev/FinishedProduct',
            name: 'FinishedProduct',
            icon: 'deployment-unit',
            component: './dev/FinishedProduct',
          },
        ],
      },

      // {
      //   path: '/dashboard',
      //   name: 'dashboard',
      //   icon: 'dashboard',
      //   routes: [
      //     {
      //       path: '/dashboard/analysis',
      //       name: 'analysis',
      //       component: './Dashboard/Analysis',
      //     },
      //     {
      //       path: '/dashboard/monitor',
      //       name: 'monitor',
      //       component: './Dashboard/Monitor',
      //     },
      //     {
      //       path: '/dashboard/workplace',
      //       name: 'workplace',
      //       component: './Dashboard/Workplace',
      //     },
      //   ],
      // },
      // // forms
      // {
      //   path: '/form',
      //   icon: 'form',
      //   name: 'form',
      //   routes: [
      //     {
      //       path: '/form/basic-form',
      //       name: 'basicform',
      //       component: './Forms/BasicForm',
      //     },
      //     {
      //       path: '/form/step-form',
      //       name: 'stepform',
      //       component: './Forms/StepForm',
      //       hideChildrenInMenu: true,
      //       routes: [
      //         {
      //           path: '/form/step-form',
      //           redirect: '/form/step-form/info',
      //         },
      //         {
      //           path: '/form/step-form/info',
      //           name: 'info',
      //           component: './Forms/StepForm/Step1',
      //         },
      //         {
      //           path: '/form/step-form/confirm',
      //           name: 'confirm',
      //           component: './Forms/StepForm/Step2',
      //         },
      //         {
      //           path: '/form/step-form/result',
      //           name: 'result',
      //           component: './Forms/StepForm/Step3',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/form/advanced-form',
      //       name: 'advancedform',
      //       authority: ['admin'],
      //       component: './Forms/AdvancedForm',
      //     },
      //   ],
      // },

      // list
      // {
      //   path: '/list',
      //   icon: 'table',
      //   name: 'list',
      //   routes: [
      //     {
      //       path: '/list/table-list',
      //       name: 'searchtable',
      //       component: './List/TableList',
      //     },
      //     {
      //       path: '/list/basic-list',
      //       name: 'basiclist',
      //       component: './List/BasicList',
      //     },
      //     {
      //       path: '/list/card-list',
      //       name: 'cardlist',
      //       component: './List/CardList',
      //     },
      //     {
      //       path: '/list/search',
      //       name: 'searchlist',
      //       component: './List/List',
      //       routes: [
      //         {
      //           path: '/list/search',
      //           redirect: '/list/search/articles',
      //         },
      //         {
      //           path: '/list/search/articles',
      //           name: 'articles',
      //           component: './List/Articles',
      //         },
      //         {
      //           path: '/list/search/projects',
      //           name: 'projects',
      //           component: './List/Projects',
      //         },
      //         {
      //           path: '/list/search/applications',
      //           name: 'applications',
      //           component: './List/Applications',
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   path: '/profile',
      //   name: 'profile',
      //   icon: 'profile',
      //   routes: [
      //     // profile
      //     {
      //       path: '/profile/basic',
      //       name: 'basic',
      //       component: './Profile/BasicProfile',
      //     },
      //     {
      //       path: '/profile/basic/:id',
      //       name: 'basic',
      //       hideInMenu: true,
      //       component: './Profile/BasicProfile',
      //     },
      //     {
      //       path: '/profile/advanced',
      //       name: 'advanced',
      //       authority: ['admin'],
      //       component: './Profile/AdvancedProfile',
      //     },
      //   ],
      // },
      // {
      //   name: 'result',
      //   icon: 'check-circle-o',
      //   path: '/result',
      //   routes: [
      //     // result
      //     {
      //       path: '/result/success',
      //       name: 'success',
      //       component: './Result/Success',
      //     },
      //     { path: '/result/fail', name: 'fail', component: './Result/Error' },
      //   ],
      // },
      // {
      //   name: 'exception',
      //   icon: 'warning',
      //   path: '/exception',
      //   routes: [
      //     // exception
      //     {
      //       path: '/exception/403',
      //       name: 'not-permission',
      //       component: './Exception/403',
      //     },
      //     {
      //       path: '/exception/404',
      //       name: 'not-find',
      //       component: './Exception/404',
      //     },
      //     {
      //       path: '/exception/500',
      //       name: 'server-error',
      //       component: './Exception/500',
      //     },
      //     {
      //       path: '/exception/trigger',
      //       name: 'trigger',
      //       hideInMenu: true,
      //       component: './Exception/TriggerException',
      //     },
      //   ],
      // },
      // {
      //   name: 'account',
      //   icon: 'user',
      //   path: '/account',
      //   routes: [
      //     {
      //       path: '/account/center',
      //       name: 'center',
      //       component: './Account/Center/Center',
      //       routes: [
      //         {
      //           path: '/account/center',
      //           redirect: '/account/center/articles',
      //         },
      //         {
      //           path: '/account/center/articles',
      //           component: './Account/Center/Articles',
      //         },
      //         {
      //           path: '/account/center/applications',
      //           component: './Account/Center/Applications',
      //         },
      //         {
      //           path: '/account/center/projects',
      //           component: './Account/Center/Projects',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/account/settings',
      //       name: 'settings',
      //       component: './Account/Settings/Info',
      //       routes: [
      //         {
      //           path: '/account/settings',
      //           redirect: '/account/settings/base',
      //         },
      //         {
      //           path: '/account/settings/base',
      //           component: './Account/Settings/BaseView',
      //         },
      //         {
      //           path: '/account/settings/security',
      //           component: './Account/Settings/SecurityView',
      //         },
      //         {
      //           path: '/account/settings/binding',
      //           component: './Account/Settings/BindingView',
      //         },
      //         {
      //           path: '/account/settings/notification',
      //           component: './Account/Settings/NotificationView',
      //         },
      //       ],
      //     },
      //   ],
      // },
      //  editor
      // {
      //   name: 'editor',
      //   icon: 'highlight',
      //   path: '/editor',
      //   routes: [
      //     {
      //       path: '/editor/flow',
      //       name: 'flow',
      //       component: './Editor/GGEditor/Flow',
      //     },
      //     {
      //       path: '/editor/mind',
      //       name: 'mind',
      //       component: './Editor/GGEditor/Mind',
      //     },
      //     {
      //       path: '/editor/koni',
      //       name: 'koni',
      //       component: './Editor/GGEditor/Koni',
      //     },
      //   ],
      // },

      {
        path: '/system',
        icon: 'setting',
        name: 'system',
        routes: [
          {
            path: '/system/department',
            name: 'department',
            icon: 'apartment',
            component: './system/Department',
            routes: [],
          }, {
            path: '/system/personnel',
            name: 'personnel',
            icon: 'user',
            component: './system/Personnel',
            routes: [],
          }, {
            path: '/system/authority',
            name: 'authority',
            icon: 'lock',
            component: './system/Authority',
            routes: [],
          },
        ],
      },
    ],

  },

];
