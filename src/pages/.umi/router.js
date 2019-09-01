import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import RendererWrapper0 from '/Users/apple/Documents/workplace/jewelry/src/pages/.umi/LocaleWrapper.jsx';
import _dvaDynamic from 'dva/dynamic';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/user',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__UserLayout" */ '../../layouts/UserLayout'),
          LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/UserLayout').default,
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
        exact: true,
      },
      {
        path: '/user/login',
        name: 'login',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__User__models__register.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/User/models/register.js').then(
                  m => {
                    return { namespace: 'register', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__User__Login" */ '../User/Login'),
              LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                .default,
            })
          : require('../User/Login').default,
        exact: true,
      },
      {
        path: '/user/register',
        name: 'register',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__User__models__register.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/User/models/register.js').then(
                  m => {
                    return { namespace: 'register', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__User__Register" */ '../User/Register'),
              LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                .default,
            })
          : require('../User/Register').default,
        exact: true,
      },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__User__models__register.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/User/models/register.js').then(
                  m => {
                    return { namespace: 'register', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__User__RegisterResult" */ '../User/RegisterResult'),
              LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                .default,
            })
          : require('../User/RegisterResult').default,
        exact: true,
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ '../404'),
              LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                .default,
            })
          : require('../404').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/apple/Documents/workplace/jewelry/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
          LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/BasicLayout').default,
    Routes: [require('../Authorized').default],
    routes: [
      {
        path: '/index.html',
        redirect: '/business/client',
        exact: true,
      },
      {
        path: '/',
        redirect: '/business/client',
        exact: true,
      },
      {
        path: '/business',
        icon: 'code',
        name: 'business',
        routes: [
          {
            path: '/business/client',
            name: 'Client',
            icon: 'user',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Business__Client__models__city.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/city.js').then(
                      m => {
                        return { namespace: 'city', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Business__Client__models__client.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/client.js').then(
                      m => {
                        return { namespace: 'client', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Business__Client__models__customer.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/customer.js').then(
                      m => {
                        return { namespace: 'customer', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Business__Client__models__dict.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/dict.js').then(
                      m => {
                        return { namespace: 'dict', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Business__Client__models__geographic.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/geographic.js').then(
                      m => {
                        return { namespace: 'geographic', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Business__Client__models__maintainer.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/maintainer.js').then(
                      m => {
                        return { namespace: 'maintainer', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Business__Client__models__mark.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/mark.js').then(
                      m => {
                        return { namespace: 'mark', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Business__Client__models__package.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/package.js').then(
                      m => {
                        return { namespace: 'package', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Business__Client__models__terminal.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/terminal.js').then(
                      m => {
                        return { namespace: 'terminal', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Business__Client__ClientView" */ '../Business/Client/ClientView'),
                  LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                    .default,
                })
              : require('../Business/Client/ClientView').default,
            routes: [
              {
                path: '/business/client',
                redirect: '/business/client/emptyView',
                exact: true,
              },
              {
                path: '/business/client/emptyView',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Business__Client__models__city.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/city.js').then(
                          m => {
                            return { namespace: 'city', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__client.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/client.js').then(
                          m => {
                            return { namespace: 'client', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__customer.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/customer.js').then(
                          m => {
                            return { namespace: 'customer', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__dict.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/dict.js').then(
                          m => {
                            return { namespace: 'dict', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__geographic.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/geographic.js').then(
                          m => {
                            return { namespace: 'geographic', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__maintainer.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/maintainer.js').then(
                          m => {
                            return { namespace: 'maintainer', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__mark.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/mark.js').then(
                          m => {
                            return { namespace: 'mark', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__package.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/package.js').then(
                          m => {
                            return { namespace: 'package', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__terminal.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/terminal.js').then(
                          m => {
                            return { namespace: 'terminal', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Business__Client__ClientView" */ '../Business/Client/EmptyView'),
                      LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Business/Client/EmptyView').default,
                exact: true,
              },
              {
                path: '/business/client/client',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Business__Client__models__city.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/city.js').then(
                          m => {
                            return { namespace: 'city', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__client.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/client.js').then(
                          m => {
                            return { namespace: 'client', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__customer.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/customer.js').then(
                          m => {
                            return { namespace: 'customer', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__dict.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/dict.js').then(
                          m => {
                            return { namespace: 'dict', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__geographic.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/geographic.js').then(
                          m => {
                            return { namespace: 'geographic', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__maintainer.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/maintainer.js').then(
                          m => {
                            return { namespace: 'maintainer', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__mark.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/mark.js').then(
                          m => {
                            return { namespace: 'mark', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__package.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/package.js').then(
                          m => {
                            return { namespace: 'package', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__terminal.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/terminal.js').then(
                          m => {
                            return { namespace: 'terminal', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Business__Client__ClientView" */ '../Business/Client/ClientInfo'),
                      LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Business/Client/ClientInfo').default,
                exact: true,
              },
              {
                path: '/business/client/terminal',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Business__Client__models__city.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/city.js').then(
                          m => {
                            return { namespace: 'city', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__client.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/client.js').then(
                          m => {
                            return { namespace: 'client', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__customer.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/customer.js').then(
                          m => {
                            return { namespace: 'customer', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__dict.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/dict.js').then(
                          m => {
                            return { namespace: 'dict', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__geographic.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/geographic.js').then(
                          m => {
                            return { namespace: 'geographic', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__maintainer.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/maintainer.js').then(
                          m => {
                            return { namespace: 'maintainer', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__mark.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/mark.js').then(
                          m => {
                            return { namespace: 'mark', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__package.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/package.js').then(
                          m => {
                            return { namespace: 'package', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__terminal.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/terminal.js').then(
                          m => {
                            return { namespace: 'terminal', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Business__Client__ClientView" */ '../Business/Client/TerminalClient'),
                      LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Business/Client/TerminalClient').default,
                exact: true,
              },
              {
                path: '/business/client/product',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Business__Client__models__city.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/city.js').then(
                          m => {
                            return { namespace: 'city', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__client.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/client.js').then(
                          m => {
                            return { namespace: 'client', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__customer.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/customer.js').then(
                          m => {
                            return { namespace: 'customer', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__dict.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/dict.js').then(
                          m => {
                            return { namespace: 'dict', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__geographic.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/geographic.js').then(
                          m => {
                            return { namespace: 'geographic', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__maintainer.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/maintainer.js').then(
                          m => {
                            return { namespace: 'maintainer', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__mark.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/mark.js').then(
                          m => {
                            return { namespace: 'mark', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__package.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/package.js').then(
                          m => {
                            return { namespace: 'package', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__terminal.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/terminal.js').then(
                          m => {
                            return { namespace: 'terminal', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Business__Client__ClientView" */ '../Business/Client/Product'),
                      LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Business/Client/Product').default,
                exact: true,
              },
              {
                path: '/business/client/marking',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Business__Client__models__city.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/city.js').then(
                          m => {
                            return { namespace: 'city', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__client.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/client.js').then(
                          m => {
                            return { namespace: 'client', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__customer.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/customer.js').then(
                          m => {
                            return { namespace: 'customer', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__dict.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/dict.js').then(
                          m => {
                            return { namespace: 'dict', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__geographic.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/geographic.js').then(
                          m => {
                            return { namespace: 'geographic', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__maintainer.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/maintainer.js').then(
                          m => {
                            return { namespace: 'maintainer', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__mark.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/mark.js').then(
                          m => {
                            return { namespace: 'mark', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__package.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/package.js').then(
                          m => {
                            return { namespace: 'package', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__terminal.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/terminal.js').then(
                          m => {
                            return { namespace: 'terminal', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Business__Client__ClientView" */ '../Business/Client/Mark'),
                      LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Business/Client/Mark').default,
                exact: true,
              },
              {
                path: '/business/client/package',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Business__Client__models__city.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/city.js').then(
                          m => {
                            return { namespace: 'city', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__client.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/client.js').then(
                          m => {
                            return { namespace: 'client', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__customer.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/customer.js').then(
                          m => {
                            return { namespace: 'customer', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__dict.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/dict.js').then(
                          m => {
                            return { namespace: 'dict', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__geographic.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/geographic.js').then(
                          m => {
                            return { namespace: 'geographic', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__maintainer.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/maintainer.js').then(
                          m => {
                            return { namespace: 'maintainer', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__mark.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/mark.js').then(
                          m => {
                            return { namespace: 'mark', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__package.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/package.js').then(
                          m => {
                            return { namespace: 'package', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__terminal.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/terminal.js').then(
                          m => {
                            return { namespace: 'terminal', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Business__Client__ClientView" */ '../Business/Client/PackageInfo'),
                      LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Business/Client/PackageInfo').default,
                exact: true,
              },
              {
                path: '/business/client/history',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Business__Client__models__city.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/city.js').then(
                          m => {
                            return { namespace: 'city', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__client.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/client.js').then(
                          m => {
                            return { namespace: 'client', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__customer.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/customer.js').then(
                          m => {
                            return { namespace: 'customer', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__dict.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/dict.js').then(
                          m => {
                            return { namespace: 'dict', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__geographic.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/geographic.js').then(
                          m => {
                            return { namespace: 'geographic', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__maintainer.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/maintainer.js').then(
                          m => {
                            return { namespace: 'maintainer', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__mark.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/mark.js').then(
                          m => {
                            return { namespace: 'mark', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__package.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/package.js').then(
                          m => {
                            return { namespace: 'package', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Client__models__terminal.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Client/models/terminal.js').then(
                          m => {
                            return { namespace: 'terminal', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Business__Client__ClientView" */ '../Business/Client/History'),
                      LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Business/Client/History').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/apple/Documents/workplace/jewelry/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/business/basic',
            name: 'Basic',
            icon: 'bulb',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Business__Basic__models__basic.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/basic.js').then(
                      m => {
                        return { namespace: 'basic', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Business__Basic__models__currency.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/currency.js').then(
                      m => {
                        return { namespace: 'currency', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Business__Basic__models__requested.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/requested.js').then(
                      m => {
                        return { namespace: 'requested', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Business__Basic__models__ringnum.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/ringnum.js').then(
                      m => {
                        return { namespace: 'ringnum', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Business__Basic__models__ringnum2.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/ringnum2.js').then(
                      m => {
                        return { namespace: 'ringnum2', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Business__Basic__models__royalty.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/royalty.js').then(
                      m => {
                        return { namespace: 'royalty', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Business__Basic__models__sendway.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/sendway.js').then(
                      m => {
                        return { namespace: 'sendway', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Business__Basic__Info" */ '../Business/Basic/Info'),
                  LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                    .default,
                })
              : require('../Business/Basic/Info').default,
            routes: [
              {
                path: '/business/basic',
                redirect: '/business/basic/base',
                exact: true,
              },
              {
                path: '/business/basic/base',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Business__Basic__models__basic.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/basic.js').then(
                          m => {
                            return { namespace: 'basic', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__currency.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/currency.js').then(
                          m => {
                            return { namespace: 'currency', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__requested.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/requested.js').then(
                          m => {
                            return { namespace: 'requested', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__ringnum.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/ringnum.js').then(
                          m => {
                            return { namespace: 'ringnum', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__ringnum2.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/ringnum2.js').then(
                          m => {
                            return { namespace: 'ringnum2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__royalty.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/royalty.js').then(
                          m => {
                            return { namespace: 'royalty', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__sendway.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/sendway.js').then(
                          m => {
                            return { namespace: 'sendway', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Business__Basic__Info" */ '../Business/Basic/Brand'),
                      LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Business/Basic/Brand').default,
                exact: true,
              },
              {
                path: '/business/basic/security',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Business__Basic__models__basic.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/basic.js').then(
                          m => {
                            return { namespace: 'basic', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__currency.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/currency.js').then(
                          m => {
                            return { namespace: 'currency', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__requested.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/requested.js').then(
                          m => {
                            return { namespace: 'requested', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__ringnum.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/ringnum.js').then(
                          m => {
                            return { namespace: 'ringnum', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__ringnum2.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/ringnum2.js').then(
                          m => {
                            return { namespace: 'ringnum2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__royalty.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/royalty.js').then(
                          m => {
                            return { namespace: 'royalty', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__sendway.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/sendway.js').then(
                          m => {
                            return { namespace: 'sendway', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Business__Basic__Info" */ '../Business/Basic/SecurityView'),
                      LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Business/Basic/SecurityView').default,
                exact: true,
              },
              {
                path: '/business/basic/binding',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Business__Basic__models__basic.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/basic.js').then(
                          m => {
                            return { namespace: 'basic', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__currency.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/currency.js').then(
                          m => {
                            return { namespace: 'currency', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__requested.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/requested.js').then(
                          m => {
                            return { namespace: 'requested', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__ringnum.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/ringnum.js').then(
                          m => {
                            return { namespace: 'ringnum', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__ringnum2.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/ringnum2.js').then(
                          m => {
                            return { namespace: 'ringnum2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__royalty.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/royalty.js').then(
                          m => {
                            return { namespace: 'royalty', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__sendway.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/sendway.js').then(
                          m => {
                            return { namespace: 'sendway', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Business__Basic__Info" */ '../Business/Basic/BindingView'),
                      LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Business/Basic/BindingView').default,
                exact: true,
              },
              {
                path: '/business/basic/notification',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Business__Basic__models__basic.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/basic.js').then(
                          m => {
                            return { namespace: 'basic', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__currency.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/currency.js').then(
                          m => {
                            return { namespace: 'currency', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__requested.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/requested.js').then(
                          m => {
                            return { namespace: 'requested', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__ringnum.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/ringnum.js').then(
                          m => {
                            return { namespace: 'ringnum', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__ringnum2.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/ringnum2.js').then(
                          m => {
                            return { namespace: 'ringnum2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__royalty.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/royalty.js').then(
                          m => {
                            return { namespace: 'royalty', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__sendway.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/sendway.js').then(
                          m => {
                            return { namespace: 'sendway', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Business__Basic__Info" */ '../Business/Basic/NotificationView'),
                      LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Business/Basic/NotificationView').default,
                exact: true,
              },
              {
                path: '/business/basic/brand',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Business__Basic__models__basic.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/basic.js').then(
                          m => {
                            return { namespace: 'basic', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__currency.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/currency.js').then(
                          m => {
                            return { namespace: 'currency', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__requested.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/requested.js').then(
                          m => {
                            return { namespace: 'requested', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__ringnum.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/ringnum.js').then(
                          m => {
                            return { namespace: 'ringnum', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__ringnum2.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/ringnum2.js').then(
                          m => {
                            return { namespace: 'ringnum2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__royalty.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/royalty.js').then(
                          m => {
                            return { namespace: 'royalty', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__sendway.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/sendway.js').then(
                          m => {
                            return { namespace: 'sendway', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Business__Basic__Info" */ '../Business/Basic/Brand'),
                      LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Business/Basic/Brand').default,
                routes: [
                  {
                    path: '/business/basic/brand',
                    redirect: '/business/basic/brand/from',
                    exact: true,
                  },
                  {
                    component: () =>
                      React.createElement(
                        require('/Users/apple/Documents/workplace/jewelry/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                          .default,
                        { pagesPath: 'src/pages', hasRoutesInConfig: true },
                      ),
                  },
                ],
              },
              {
                path: '/business/basic/requested',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Business__Basic__models__basic.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/basic.js').then(
                          m => {
                            return { namespace: 'basic', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__currency.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/currency.js').then(
                          m => {
                            return { namespace: 'currency', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__requested.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/requested.js').then(
                          m => {
                            return { namespace: 'requested', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__ringnum.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/ringnum.js').then(
                          m => {
                            return { namespace: 'ringnum', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__ringnum2.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/ringnum2.js').then(
                          m => {
                            return { namespace: 'ringnum2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__royalty.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/royalty.js').then(
                          m => {
                            return { namespace: 'royalty', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__sendway.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/sendway.js').then(
                          m => {
                            return { namespace: 'sendway', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Business__Basic__Info" */ '../Business/Basic/Requested'),
                      LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Business/Basic/Requested').default,
                exact: true,
              },
              {
                path: '/business/basic/sendWay',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Business__Basic__models__basic.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/basic.js').then(
                          m => {
                            return { namespace: 'basic', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__currency.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/currency.js').then(
                          m => {
                            return { namespace: 'currency', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__requested.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/requested.js').then(
                          m => {
                            return { namespace: 'requested', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__ringnum.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/ringnum.js').then(
                          m => {
                            return { namespace: 'ringnum', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__ringnum2.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/ringnum2.js').then(
                          m => {
                            return { namespace: 'ringnum2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__royalty.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/royalty.js').then(
                          m => {
                            return { namespace: 'royalty', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__sendway.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/sendway.js').then(
                          m => {
                            return { namespace: 'sendway', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Business__Basic__Info" */ '../Business/Basic/SendWay'),
                      LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Business/Basic/SendWay').default,
                exact: true,
              },
              {
                path: '/business/basic/royalty',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Business__Basic__models__basic.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/basic.js').then(
                          m => {
                            return { namespace: 'basic', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__currency.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/currency.js').then(
                          m => {
                            return { namespace: 'currency', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__requested.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/requested.js').then(
                          m => {
                            return { namespace: 'requested', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__ringnum.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/ringnum.js').then(
                          m => {
                            return { namespace: 'ringnum', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__ringnum2.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/ringnum2.js').then(
                          m => {
                            return { namespace: 'ringnum2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__royalty.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/royalty.js').then(
                          m => {
                            return { namespace: 'royalty', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__sendway.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/sendway.js').then(
                          m => {
                            return { namespace: 'sendway', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Business__Basic__Info" */ '../Business/Basic/Royalty'),
                      LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Business/Basic/Royalty').default,
                exact: true,
              },
              {
                path: '/business/basic/ring',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Business__Basic__models__basic.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/basic.js').then(
                          m => {
                            return { namespace: 'basic', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__currency.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/currency.js').then(
                          m => {
                            return { namespace: 'currency', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__requested.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/requested.js').then(
                          m => {
                            return { namespace: 'requested', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__ringnum.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/ringnum.js').then(
                          m => {
                            return { namespace: 'ringnum', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__ringnum2.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/ringnum2.js').then(
                          m => {
                            return { namespace: 'ringnum2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__royalty.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/royalty.js').then(
                          m => {
                            return { namespace: 'royalty', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__sendway.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/sendway.js').then(
                          m => {
                            return { namespace: 'sendway', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Business__Basic__Info" */ '../Business/Basic/RingNum'),
                      LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Business/Basic/RingNum').default,
                exact: true,
              },
              {
                path: '/business/basic/currency',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Business__Basic__models__basic.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/basic.js').then(
                          m => {
                            return { namespace: 'basic', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__currency.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/currency.js').then(
                          m => {
                            return { namespace: 'currency', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__requested.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/requested.js').then(
                          m => {
                            return { namespace: 'requested', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__ringnum.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/ringnum.js').then(
                          m => {
                            return { namespace: 'ringnum', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__ringnum2.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/ringnum2.js').then(
                          m => {
                            return { namespace: 'ringnum2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__royalty.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/royalty.js').then(
                          m => {
                            return { namespace: 'royalty', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Business__Basic__models__sendway.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Basic/models/sendway.js').then(
                          m => {
                            return { namespace: 'sendway', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Business__Basic__Info" */ '../Business/Basic/Currency'),
                      LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Business/Basic/Currency').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/apple/Documents/workplace/jewelry/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/business/product',
            name: 'Product',
            icon: 'shopping',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Business__Product__models__product.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Product/models/product.js').then(
                      m => {
                        return { namespace: 'product', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Business__Product__ProductInfo" */ '../Business/Product/ProductInfo'),
                  LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                    .default,
                })
              : require('../Business/Product/ProductInfo').default,
            routes: [
              {
                component: () =>
                  React.createElement(
                    require('/Users/apple/Documents/workplace/jewelry/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/business/specimen',
            name: 'Specimen',
            icon: 'form',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Business__Specimen__models__specimen.js' */ '/Users/apple/Documents/workplace/jewelry/src/pages/Business/Specimen/models/specimen.js').then(
                      m => {
                        return { namespace: 'specimen', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Business__Specimen__Specimen" */ '../Business/Specimen/Specimen'),
                  LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                    .default,
                })
              : require('../Business/Specimen/Specimen').default,
            routes: [
              {
                component: () =>
                  React.createElement(
                    require('/Users/apple/Documents/workplace/jewelry/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/business/quote',
            name: 'Quote',
            icon: 'form',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Business__Quote" */ '../Business/Quote'),
                  LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                    .default,
                })
              : require('../Business/Quote').default,
            routes: [
              {
                component: () =>
                  React.createElement(
                    require('/Users/apple/Documents/workplace/jewelry/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/business/proforminvoice',
            name: 'Proform Invoice',
            icon: 'form',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Business__Proforminvoice__Proforminvoice" */ '../Business/Proforminvoice/Proforminvoice'),
                  LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                    .default,
                })
              : require('../Business/Proforminvoice/Proforminvoice').default,
            routes: [
              {
                component: () =>
                  React.createElement(
                    require('/Users/apple/Documents/workplace/jewelry/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/business/deliver',
            name: 'Deliver',
            icon: 'form',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Business__Deliver__Deliver" */ '../Business/Deliver/Deliver'),
                  LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                    .default,
                })
              : require('../Business/Deliver/Deliver').default,
            routes: [
              {
                component: () =>
                  React.createElement(
                    require('/Users/apple/Documents/workplace/jewelry/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/business/Receiving',
            name: 'Receiving',
            icon: 'form',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Business__Receiving__Receiving" */ '../Business/Receiving/Receiving'),
                  LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                    .default,
                })
              : require('../Business/Receiving/Receiving').default,
            routes: [
              {
                component: () =>
                  React.createElement(
                    require('/Users/apple/Documents/workplace/jewelry/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/business/report',
            name: 'Report',
            icon: 'form',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Business__Report__Report" */ '../Business/Report/Report'),
                  LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                    .default,
                })
              : require('../Business/Report/Report').default,
            routes: [
              {
                component: () =>
                  React.createElement(
                    require('/Users/apple/Documents/workplace/jewelry/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            component: () =>
              React.createElement(
                require('/Users/apple/Documents/workplace/jewelry/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/dev',
        icon: 'form',
        name: 'dev',
        routes: [
          {
            path: '/dev/basic',
            name: 'Basic',
            icon: 'bulb',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__dev__Basic" */ '../dev/Basic'),
                  LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                    .default,
                })
              : require('../dev/Basic').default,
            exact: true,
          },
          {
            path: '/dev/Mould',
            name: 'Mould',
            icon: 'inbox',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__dev__Mould" */ '../dev/Mould'),
                  LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                    .default,
                })
              : require('../dev/Mould').default,
            exact: true,
          },
          {
            path: '/dev/Raw',
            name: 'Raw',
            icon: 'inbox',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__dev__Raw" */ '../dev/Raw'),
                  LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                    .default,
                })
              : require('../dev/Raw').default,
            exact: true,
          },
          {
            path: '/dev/FinishedProduct',
            name: 'FinishedProduct',
            icon: 'deployment-unit',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__dev__FinishedProduct" */ '../dev/FinishedProduct'),
                  LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                    .default,
                })
              : require('../dev/FinishedProduct').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/apple/Documents/workplace/jewelry/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ '../404'),
              LoadingComponent: require('/Users/apple/Documents/workplace/jewelry/src/components/PageLoading/index')
                .default,
            })
          : require('../404').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/apple/Documents/workplace/jewelry/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: () =>
      React.createElement(
        require('/Users/apple/Documents/workplace/jewelry/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen = () => {};

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    routeChangeHandler(history.location);
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
