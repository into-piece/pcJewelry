import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from 'G:/htmlproject/jewelry5_g/src/pages/.umi/LocaleWrapper.jsx'
import _dvaDynamic from 'dva/dynamic'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/",
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../../layouts/BasicLayout'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
    "routes": [
      {
        "path": "/index.html",
        "redirect": "/business/client",
        "authority": [
          "admin",
          "user"
        ],
        "exact": true
      },
      {
        "path": "/",
        "redirect": "/business/client",
        "authority": [
          "admin",
          "user"
        ],
        "exact": true
      },
      {
        "path": "/business",
        "icon": "form",
        "name": "business",
        "routes": [
          {
            "path": "/business/client",
            "name": "client",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Business__Client__models__models__profile.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/models/profile.js').then(m => { return { namespace: 'profile',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Business__Client__ClientView" */'../Business/Client/ClientView'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
            "routes": [
              {
                "path": "/business/client",
                "redirect": "/business/client/emptyView",
                "exact": true
              },
              {
                "path": "/business/client/emptyView",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Business__Client__models__models__profile.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/models/profile.js').then(m => { return { namespace: 'profile',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Business__Client__ClientView" */'../Business/Client/EmptyView'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/business/client/client",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Business__Client__models__models__profile.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/models/profile.js').then(m => { return { namespace: 'profile',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Business__Client__ClientView" */'../Business/Client/ClientInfo'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/business/client/terminal",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Business__Client__models__models__profile.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/models/profile.js').then(m => { return { namespace: 'profile',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Business__Client__ClientView" */'../Business/Client/TerminalClient'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/business/client/product",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Business__Client__models__models__profile.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/models/profile.js').then(m => { return { namespace: 'profile',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Business__Client__ClientView" */'../Business/Client/Product'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/business/client/marking",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Business__Client__models__models__profile.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/models/profile.js').then(m => { return { namespace: 'profile',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Business__Client__ClientView" */'../Business/Client/Mark'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/business/client/package",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Business__Client__models__models__profile.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/models/profile.js').then(m => { return { namespace: 'profile',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Business__Client__ClientView" */'../Business/Client/PackageInfo'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/business/client/history",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Business__Client__models__models__profile.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/models/profile.js').then(m => { return { namespace: 'profile',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Business__Client__ClientView" */'../Business/Client/History'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "component": () => React.createElement(require('G:/htmlproject/jewelry5_g/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/business/basic",
            "name": "basic",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Business__Basic__models__basic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/basic.js').then(m => { return { namespace: 'basic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__geographic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__royalty.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/royalty.js').then(m => { return { namespace: 'royalty',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__sendway.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/sendway.js').then(m => { return { namespace: 'sendway',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Business__Basic__Info" */'../Business/Basic/Info'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
            "routes": [
              {
                "path": "/business/basic",
                "redirect": "/business/basic/base",
                "exact": true
              },
              {
                "path": "/business/basic/base",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Business__Basic__models__basic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/basic.js').then(m => { return { namespace: 'basic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__geographic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__royalty.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/royalty.js').then(m => { return { namespace: 'royalty',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__sendway.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/sendway.js').then(m => { return { namespace: 'sendway',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Business__Basic__Info" */'../Business/Basic/Brand'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/business/basic/security",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Business__Basic__models__basic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/basic.js').then(m => { return { namespace: 'basic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__geographic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__royalty.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/royalty.js').then(m => { return { namespace: 'royalty',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__sendway.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/sendway.js').then(m => { return { namespace: 'sendway',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Business__Basic__Info" */'../Business/Basic/SecurityView'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/business/basic/binding",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Business__Basic__models__basic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/basic.js').then(m => { return { namespace: 'basic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__geographic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__royalty.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/royalty.js').then(m => { return { namespace: 'royalty',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__sendway.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/sendway.js').then(m => { return { namespace: 'sendway',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Business__Basic__Info" */'../Business/Basic/BindingView'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/business/basic/notification",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Business__Basic__models__basic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/basic.js').then(m => { return { namespace: 'basic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__geographic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__royalty.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/royalty.js').then(m => { return { namespace: 'royalty',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__sendway.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/sendway.js').then(m => { return { namespace: 'sendway',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Business__Basic__Info" */'../Business/Basic/NotificationView'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/business/basic/brand",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Business__Basic__models__basic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/basic.js').then(m => { return { namespace: 'basic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__geographic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__royalty.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/royalty.js').then(m => { return { namespace: 'royalty',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__sendway.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/sendway.js').then(m => { return { namespace: 'sendway',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Business__Basic__Info" */'../Business/Basic/Brand'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
                "routes": [
                  {
                    "path": "/business/basic/brand",
                    "redirect": "/business/basic/brand/from",
                    "exact": true
                  },
                  {
                    "component": () => React.createElement(require('G:/htmlproject/jewelry5_g/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
                  }
                ]
              },
              {
                "path": "/business/basic/requested",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Business__Basic__models__basic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/basic.js').then(m => { return { namespace: 'basic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__geographic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__royalty.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/royalty.js').then(m => { return { namespace: 'royalty',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__sendway.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/sendway.js').then(m => { return { namespace: 'sendway',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Business__Basic__Info" */'../Business/Basic/Requested'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/business/basic/sendWay",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Business__Basic__models__basic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/basic.js').then(m => { return { namespace: 'basic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__geographic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__royalty.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/royalty.js').then(m => { return { namespace: 'royalty',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__sendway.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/sendway.js').then(m => { return { namespace: 'sendway',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Business__Basic__Info" */'../Business/Basic/SendWay'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/business/basic/royalty",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Business__Basic__models__basic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/basic.js').then(m => { return { namespace: 'basic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__geographic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__royalty.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/royalty.js').then(m => { return { namespace: 'royalty',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__sendway.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/sendway.js').then(m => { return { namespace: 'sendway',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Business__Basic__Info" */'../Business/Basic/Royalty'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/business/basic/ring",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Business__Basic__models__basic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/basic.js').then(m => { return { namespace: 'basic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__geographic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__royalty.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/royalty.js').then(m => { return { namespace: 'royalty',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__sendway.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/sendway.js').then(m => { return { namespace: 'sendway',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Business__Basic__Info" */'../Business/Basic/RingNum'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/business/basic/currency",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Business__Basic__models__basic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/basic.js').then(m => { return { namespace: 'basic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__geographic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__royalty.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/royalty.js').then(m => { return { namespace: 'royalty',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__sendway.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/sendway.js').then(m => { return { namespace: 'sendway',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Business__Basic__Info" */'../Business/Basic/Currency'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "component": () => React.createElement(require('G:/htmlproject/jewelry5_g/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('G:/htmlproject/jewelry5_g/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__404" */'../404'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('G:/htmlproject/jewelry5_g/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('G:/htmlproject/jewelry5_g/node_modules/_umi-build-dev@1.8.4@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  window.g_plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
window.g_history.listen(routeChangeHandler);
routeChangeHandler(window.g_history.location);

export default function RouterWrapper() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
