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

//   routes: [
//   // dashboard
//   { path: '/', redirect: '/user/login' },
// ],
  // app
  {
    path: '/',
    Routes: ['src/pages/Authorized'],
    // authority: ['admin', 'user', 'chents'],

    routes: [
      { path: '/', redirect: '/user/login' },
      {
        path:'/erp',
        component: '../layouts/BasicLayout',
        routes:[
          // 业务 bussiness route
          {
            path: '/erp/business',
            icon: 'code',
            name: 'business',

            routes: [
              {
                path: '/erp/business/client',
                name: 'client',
                icon: 'user',
                component: './Business/Client/ClientView',

                routes: [
                  {
                    path: '/erp/business/client',
                    redirect: '/business/client/emptyView',
                  },
                  {
                    path: '/erp/business/client/emptyView',
                    component: './Business/Client/EmptyView',
                  },
                  {
                    path: '/erp/business/client/client',
                    component: './Business/Client/ClientInfo',
                  },
                  {
                    path: '/erp/business/client/terminal',
                    component: './Business/Client/TerminalClient',
                  },
                  {
                    path: '/erp/business/client/product',
                    component: './Business/Client/Product',
                  },

                  {
                    path: '/erp/business/client/marking',
                    component: './Business/Client/Mark',
                  },
                  {
                    path: '/erp/business/client/package',
                    component: './Business/Client/PackageInfo',
                  },
                  {
                    path: '/erp/business/client/history',
                    component: './Business/Client/History',
                  },
                ],
              },
              {
                path: '/erp/business/basic',
                name: 'basic',
                icon: 'bulb',
                component: './Business/Basic/Info',
                routes: [
                  {
                    path: '/erp/business/basic',
                    redirect: '/business/basic/base',
                  },
                  {
                    path: '/erp/business/basic/base',
                    component: './Business/Basic/Brand',
                  },
                  {
                    path: '/erp/business/basic/security',
                    component: './Business/Basic/SecurityView',
                  },
                  {
                    path: '/erp/business/basic/binding',
                    component: './Business/Basic/BindingView',
                  },
                  {
                    path: '/erp/business/basic/notification',
                    component: './Business/Basic/NotificationView',
                  },
                  {
                    path: '/erp/business/basic/brand',
                    component: './Business/Basic/Brand',
                    routes: [
                      {
                        path: '/erp/business/basic/brand',
                        redirect: '/erp/business/basic/brand/from',
                      },
                    ],
                  },
                  {
                    path: '/erp/business/basic/requested',
                    component: './Business/Basic/Requested',
                  },
                  {
                    path: '/erp/business/basic/sendWay',
                    component: './Business/Basic/SendWay',
                  },
                  {
                    path: '/erp/business/basic/royalty',
                    component: './Business/Basic/Royalty',
                  },
                  {
                    path: '/erp/business/basic/ring',
                    component: './Business/Basic/RingNum',
                  },
                  {
                    path: '/erp/business/basic/currency',
                    component: './Business/Basic/Currency',
                  },
                ],
              },
              {
                path: '/erp/business/product',
                name: 'product',
                icon: 'shopping',
                component: './Business/Product/ProductInfo',
                routes: [],
              },

              {
                path: '/erp/business/specimen',
                name: 'specimen',
                icon: 'form',
                component: './Business/Specimen/Specimen',
                routes: [],
              },
              {
                path: '/erp/business/quote',
                name: 'quote',
                icon: 'form',
                component: './Business/Quote',
                routes: [],
              },
              {
                path: '/erp/business/sample',
                name: 'sample',
                icon: 'form',
                component: './Business/Sample',
                routes: [],
              },
              {
                path: '/erp/business/proforminvoice',
                name: 'proforminvoice',
                icon: 'form',
                component: './Business/proforminvoice',
                routes: [],
              },

              {
                path: '/erp/business/deliver',
                name: 'deliver',
                icon: 'form',
                component: './Business/Deliver/Deliver',
                routes: [],
              },

              {
                path: '/erp/business/receiving',
                name: 'receiving',
                icon: 'form',
                component: './Business/Receiving/Receiving',
                routes: [],
              },

              {
                path: '/erp/business/report',
                name: 'report',
                icon: 'form',
                component: './Business/Report/Report',
                routes: [],
              },
            ],
          },


          // 开发 dev route
          {
            path: '/erp/dev',
            icon: 'form',
            name: 'dev',

            routes: [
              {
                path: '/erp/dev/basic',
                name: 'basic',
                icon: 'bulb',
                component: './dev/Basic',
              },
              {
                path: '/erp/dev/bom',
                name: 'bom',
                icon: 'snippets',
                component: './dev/bom',
                routes: [],
              },
              //模具设定
              {
                path: '/erp/dev/mould',
                name: 'mould',
                icon: 'inbox',
                component: './dev/Mould',
              },
              //类别管理
              {
                path: '/erp/dev/Raw',
                name: 'Raw',
                icon: 'inbox',
                component: './dev/Raw',
              },
              //生产流程
              {
                path: '/erp/dev/productflow',
                name: 'productflow',
                icon: 'build',
                component: './dev/Productflow',
              },
              //流程工费
              {
                path: '/erp/dev/flowCostType',
                name: 'flowCostType',
                icon: 'money-collect',
                component: './dev/FlowCostType',
              },
              {
                path: '/erp/dev/FinishedProduct',
                name: 'FinishedProduct',
                icon: 'deployment-unit',
                component: './dev/FinishedProduct',
              },
            ],
          },

             // 生产 production route
          {
            path: '/erp/production',
            icon: 'form',
            name: 'production',
            routes: [
              {
                path: '/erp/production/basic',
                name: 'basic',
                icon: 'bulb',
                component: './production/Basic',
              },
              {
                path: '/erp/production/orderApprove',
                name: 'orderApprove',
                icon: 'bulb',
                component: './production/OrderApprove',
              },
            ],
          },

          //采购
          {
            path: '/erp/purchase',
            icon: 'form',
            name: 'purchase',

            routes: [
              {
                path: '/erp/purchase/supplier',
                name: 'supplier',
                icon: 'bulb',
                component: './purchase/supplier',
              },
            ],

          },
          //财务
          {
            path: '/erp/finance',
            icon: 'money-collect',
            name: 'finance',

            routes: [
              {
                path: '/erp/finance/processSalary',
                name: 'processSalary',
                icon: 'snippets',
                component: './finance/processSalary',
              },
            ],

          },
          //系统
          {
            path: '/erp/system',
            icon: 'setting',
            name: 'system',

            routes: [
              {
                path: '/erp/system/department',
                name: 'department',
                icon: 'apartment',
                component: './system/Department',
                routes: [],
              }, {
                path: '/erp/system/personnel',
                name: 'personnel',
                icon: 'user',
                component: './system/Personnel',
                routes: [],
              }, {
                path: '/erp/system/authority',
                name: 'authority',
                icon: 'lock',
                component: './system/Authority',
                routes: [],
              },
            ],
          },
        ]
      },

    ],

  },
];
