import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from 'G:/htmlproject/jewelry5_g/src/pages/.umi/LocaleWrapper.jsx'
import _dvaDynamic from 'dva/dynamic'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/user",
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__UserLayout" */'../../layouts/UserLayout'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
    "routes": [
      {
        "path": "/user",
        "redirect": "/user/login",
        "exact": true
      },
      {
        "path": "/user/login",
        "name": "login",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__User__models__register.js' */'G:/htmlproject/jewelry5_g/src/pages/User/models/register.js').then(m => { return { namespace: 'register',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__User__Login" */'../User/Login'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/user/register",
        "name": "register",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__User__models__register.js' */'G:/htmlproject/jewelry5_g/src/pages/User/models/register.js').then(m => { return { namespace: 'register',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__User__Register" */'../User/Register'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/user/register-result",
        "name": "register.result",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__User__models__register.js' */'G:/htmlproject/jewelry5_g/src/pages/User/models/register.js').then(m => { return { namespace: 'register',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__User__RegisterResult" */'../User/RegisterResult'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__404" */'../404'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('G:/htmlproject/jewelry5_g/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/",
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../../layouts/BasicLayout'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
    "Routes": [require('../Authorized').default],
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
            "name": "Client",
            "icon": "user",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Business__Client__models__city.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/city.js').then(m => { return { namespace: 'city',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__client.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/client.js').then(m => { return { namespace: 'client',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__customer.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/customer.js').then(m => { return { namespace: 'customer',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__dict.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/dict.js').then(m => { return { namespace: 'dict',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__geographic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__maintainer.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/maintainer.js').then(m => { return { namespace: 'maintainer',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__mark.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/mark.js').then(m => { return { namespace: 'mark',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__package.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/package.js').then(m => { return { namespace: 'package',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__product.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/product.js').then(m => { return { namespace: 'product',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__terminal.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/terminal.js').then(m => { return { namespace: 'terminal',...m.default}})
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
  import(/* webpackChunkName: 'p__Business__Client__models__city.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/city.js').then(m => { return { namespace: 'city',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__client.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/client.js').then(m => { return { namespace: 'client',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__customer.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/customer.js').then(m => { return { namespace: 'customer',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__dict.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/dict.js').then(m => { return { namespace: 'dict',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__geographic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__maintainer.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/maintainer.js').then(m => { return { namespace: 'maintainer',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__mark.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/mark.js').then(m => { return { namespace: 'mark',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__package.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/package.js').then(m => { return { namespace: 'package',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__product.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/product.js').then(m => { return { namespace: 'product',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__terminal.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/terminal.js').then(m => { return { namespace: 'terminal',...m.default}})
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
  import(/* webpackChunkName: 'p__Business__Client__models__city.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/city.js').then(m => { return { namespace: 'city',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__client.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/client.js').then(m => { return { namespace: 'client',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__customer.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/customer.js').then(m => { return { namespace: 'customer',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__dict.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/dict.js').then(m => { return { namespace: 'dict',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__geographic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__maintainer.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/maintainer.js').then(m => { return { namespace: 'maintainer',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__mark.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/mark.js').then(m => { return { namespace: 'mark',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__package.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/package.js').then(m => { return { namespace: 'package',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__product.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/product.js').then(m => { return { namespace: 'product',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__terminal.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/terminal.js').then(m => { return { namespace: 'terminal',...m.default}})
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
  import(/* webpackChunkName: 'p__Business__Client__models__city.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/city.js').then(m => { return { namespace: 'city',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__client.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/client.js').then(m => { return { namespace: 'client',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__customer.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/customer.js').then(m => { return { namespace: 'customer',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__dict.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/dict.js').then(m => { return { namespace: 'dict',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__geographic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__maintainer.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/maintainer.js').then(m => { return { namespace: 'maintainer',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__mark.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/mark.js').then(m => { return { namespace: 'mark',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__package.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/package.js').then(m => { return { namespace: 'package',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__product.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/product.js').then(m => { return { namespace: 'product',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__terminal.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/terminal.js').then(m => { return { namespace: 'terminal',...m.default}})
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
  import(/* webpackChunkName: 'p__Business__Client__models__city.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/city.js').then(m => { return { namespace: 'city',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__client.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/client.js').then(m => { return { namespace: 'client',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__customer.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/customer.js').then(m => { return { namespace: 'customer',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__dict.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/dict.js').then(m => { return { namespace: 'dict',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__geographic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__maintainer.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/maintainer.js').then(m => { return { namespace: 'maintainer',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__mark.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/mark.js').then(m => { return { namespace: 'mark',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__package.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/package.js').then(m => { return { namespace: 'package',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__product.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/product.js').then(m => { return { namespace: 'product',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__terminal.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/terminal.js').then(m => { return { namespace: 'terminal',...m.default}})
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
  import(/* webpackChunkName: 'p__Business__Client__models__city.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/city.js').then(m => { return { namespace: 'city',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__client.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/client.js').then(m => { return { namespace: 'client',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__customer.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/customer.js').then(m => { return { namespace: 'customer',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__dict.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/dict.js').then(m => { return { namespace: 'dict',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__geographic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__maintainer.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/maintainer.js').then(m => { return { namespace: 'maintainer',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__mark.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/mark.js').then(m => { return { namespace: 'mark',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__package.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/package.js').then(m => { return { namespace: 'package',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__product.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/product.js').then(m => { return { namespace: 'product',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__terminal.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/terminal.js').then(m => { return { namespace: 'terminal',...m.default}})
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
  import(/* webpackChunkName: 'p__Business__Client__models__city.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/city.js').then(m => { return { namespace: 'city',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__client.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/client.js').then(m => { return { namespace: 'client',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__customer.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/customer.js').then(m => { return { namespace: 'customer',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__dict.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/dict.js').then(m => { return { namespace: 'dict',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__geographic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__maintainer.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/maintainer.js').then(m => { return { namespace: 'maintainer',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__mark.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/mark.js').then(m => { return { namespace: 'mark',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__package.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/package.js').then(m => { return { namespace: 'package',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__product.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/product.js').then(m => { return { namespace: 'product',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__terminal.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/terminal.js').then(m => { return { namespace: 'terminal',...m.default}})
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
  import(/* webpackChunkName: 'p__Business__Client__models__city.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/city.js').then(m => { return { namespace: 'city',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__client.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/client.js').then(m => { return { namespace: 'client',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__customer.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/customer.js').then(m => { return { namespace: 'customer',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__dict.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/dict.js').then(m => { return { namespace: 'dict',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__geographic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__maintainer.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/maintainer.js').then(m => { return { namespace: 'maintainer',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__mark.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/mark.js').then(m => { return { namespace: 'mark',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__package.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/package.js').then(m => { return { namespace: 'package',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__product.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/product.js').then(m => { return { namespace: 'product',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Client__models__terminal.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Client/models/terminal.js').then(m => { return { namespace: 'terminal',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Business__Client__ClientView" */'../Business/Client/History'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "component": () => React.createElement(require('G:/htmlproject/jewelry5_g/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/business/basic",
            "name": "Basic",
            "icon": "bulb",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Business__Basic__models__basic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/basic.js').then(m => { return { namespace: 'basic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__currency.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/currency.js').then(m => { return { namespace: 'currency',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__requested.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/requested.js').then(m => { return { namespace: 'requested',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__ringnum.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/ringnum.js').then(m => { return { namespace: 'ringnum',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__ringnum2.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/ringnum2.js').then(m => { return { namespace: 'ringnum2',...m.default}}),
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
  import(/* webpackChunkName: 'p__Business__Basic__models__currency.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/currency.js').then(m => { return { namespace: 'currency',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__requested.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/requested.js').then(m => { return { namespace: 'requested',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__ringnum.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/ringnum.js').then(m => { return { namespace: 'ringnum',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__ringnum2.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/ringnum2.js').then(m => { return { namespace: 'ringnum2',...m.default}}),
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
  import(/* webpackChunkName: 'p__Business__Basic__models__currency.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/currency.js').then(m => { return { namespace: 'currency',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__requested.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/requested.js').then(m => { return { namespace: 'requested',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__ringnum.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/ringnum.js').then(m => { return { namespace: 'ringnum',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__ringnum2.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/ringnum2.js').then(m => { return { namespace: 'ringnum2',...m.default}}),
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
  import(/* webpackChunkName: 'p__Business__Basic__models__currency.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/currency.js').then(m => { return { namespace: 'currency',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__requested.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/requested.js').then(m => { return { namespace: 'requested',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__ringnum.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/ringnum.js').then(m => { return { namespace: 'ringnum',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__ringnum2.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/ringnum2.js').then(m => { return { namespace: 'ringnum2',...m.default}}),
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
  import(/* webpackChunkName: 'p__Business__Basic__models__currency.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/currency.js').then(m => { return { namespace: 'currency',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__requested.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/requested.js').then(m => { return { namespace: 'requested',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__ringnum.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/ringnum.js').then(m => { return { namespace: 'ringnum',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__ringnum2.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/ringnum2.js').then(m => { return { namespace: 'ringnum2',...m.default}}),
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
  import(/* webpackChunkName: 'p__Business__Basic__models__currency.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/currency.js').then(m => { return { namespace: 'currency',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__requested.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/requested.js').then(m => { return { namespace: 'requested',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__ringnum.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/ringnum.js').then(m => { return { namespace: 'ringnum',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__ringnum2.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/ringnum2.js').then(m => { return { namespace: 'ringnum2',...m.default}}),
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
                    "component": () => React.createElement(require('G:/htmlproject/jewelry5_g/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
                  }
                ]
              },
              {
                "path": "/business/basic/requested",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Business__Basic__models__basic.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/basic.js').then(m => { return { namespace: 'basic',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__currency.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/currency.js').then(m => { return { namespace: 'currency',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__requested.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/requested.js').then(m => { return { namespace: 'requested',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__ringnum.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/ringnum.js').then(m => { return { namespace: 'ringnum',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__ringnum2.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/ringnum2.js').then(m => { return { namespace: 'ringnum2',...m.default}}),
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
  import(/* webpackChunkName: 'p__Business__Basic__models__currency.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/currency.js').then(m => { return { namespace: 'currency',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__requested.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/requested.js').then(m => { return { namespace: 'requested',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__ringnum.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/ringnum.js').then(m => { return { namespace: 'ringnum',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__ringnum2.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/ringnum2.js').then(m => { return { namespace: 'ringnum2',...m.default}}),
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
  import(/* webpackChunkName: 'p__Business__Basic__models__currency.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/currency.js').then(m => { return { namespace: 'currency',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__requested.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/requested.js').then(m => { return { namespace: 'requested',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__ringnum.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/ringnum.js').then(m => { return { namespace: 'ringnum',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__ringnum2.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/ringnum2.js').then(m => { return { namespace: 'ringnum2',...m.default}}),
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
  import(/* webpackChunkName: 'p__Business__Basic__models__currency.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/currency.js').then(m => { return { namespace: 'currency',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__requested.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/requested.js').then(m => { return { namespace: 'requested',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__ringnum.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/ringnum.js').then(m => { return { namespace: 'ringnum',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__ringnum2.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/ringnum2.js').then(m => { return { namespace: 'ringnum2',...m.default}}),
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
  import(/* webpackChunkName: 'p__Business__Basic__models__currency.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/currency.js').then(m => { return { namespace: 'currency',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__requested.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/requested.js').then(m => { return { namespace: 'requested',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__ringnum.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/ringnum.js').then(m => { return { namespace: 'ringnum',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__ringnum2.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/ringnum2.js').then(m => { return { namespace: 'ringnum2',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__royalty.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/royalty.js').then(m => { return { namespace: 'royalty',...m.default}}),
  import(/* webpackChunkName: 'p__Business__Basic__models__sendway.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Basic/models/sendway.js').then(m => { return { namespace: 'sendway',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Business__Basic__Info" */'../Business/Basic/Currency'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "component": () => React.createElement(require('G:/htmlproject/jewelry5_g/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/business/product",
            "name": "Product",
            "icon": "shopping",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Business__Product__models__product.js' */'G:/htmlproject/jewelry5_g/src/pages/Business/Product/models/product.js').then(m => { return { namespace: 'product',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Business__Product__ProductInfo" */'../Business/Product/ProductInfo'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
            "routes": [
              {
                "component": () => React.createElement(require('G:/htmlproject/jewelry5_g/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/business/specimen",
            "name": "Specimen",
            "icon": "form",
            "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__Business__Specimen__Specimen" */'../Business/Specimen/Specimen'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
            "routes": [
              {
                "component": () => React.createElement(require('G:/htmlproject/jewelry5_g/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/business/quote",
            "name": "Quote",
            "icon": "form",
            "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__Business__Quote__Quote" */'../Business/Quote/Quote'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
            "routes": [
              {
                "component": () => React.createElement(require('G:/htmlproject/jewelry5_g/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/business/proforminvoice",
            "name": "Proform Invoice",
            "icon": "form",
            "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__Business__Proforminvoice__Proforminvoice" */'../Business/Proforminvoice/Proforminvoice'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
            "routes": [
              {
                "component": () => React.createElement(require('G:/htmlproject/jewelry5_g/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/business/deliver",
            "name": "Deliver",
            "icon": "form",
            "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__Business__Deliver__Deliver" */'../Business/Deliver/Deliver'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
            "routes": [
              {
                "component": () => React.createElement(require('G:/htmlproject/jewelry5_g/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/business/Receiving",
            "name": "Receiving",
            "icon": "form",
            "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__Business__Receiving__Receiving" */'../Business/Receiving/Receiving'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
            "routes": [
              {
                "component": () => React.createElement(require('G:/htmlproject/jewelry5_g/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/business/report",
            "name": "Report",
            "icon": "form",
            "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__Business__Report__Report" */'../Business/Report/Report'),
  LoadingComponent: require('G:/htmlproject/jewelry5_g/src/components/PageLoading/index').default,
}),
            "routes": [
              {
                "component": () => React.createElement(require('G:/htmlproject/jewelry5_g/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('G:/htmlproject/jewelry5_g/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
        "component": () => React.createElement(require('G:/htmlproject/jewelry5_g/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('G:/htmlproject/jewelry5_g/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
