import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import { formatMessage } from 'umi-plugin-react/locale';
import Authorized from '@/utils/Authorized';
import { getMenuData } from '@/services/user';
import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { menu } from '../defaultSettings';

const { check } = Authorized;

function isInMenu(arr, pathname) {
  return arr.some((e) => {
    if (e.path === pathname) {
      return true;
    }
    if (e.path !== pathname && e.children && e.children.length > 0) {
      return isInMenu(e.children, pathname);
    }
    return false;

  });

}

// Conversion router to menu.
function formatter(data, parentAuthority, parentName) {
  // console.log(data, parentAuthority, parentName, '==============')
  if (!data) {
    return undefined;
  }
  return data
    .map(item => {
      if (!item.name || !item.path) {
        return null;
      }

      let locale = 'menu';
      if (parentName && parentName !== '/erp') {
        // parentName = parentName.replace(/\//g,"")
        locale = `${parentName}.${item.name}`;
      } else {
        locale = `menu.${item.name}`;
      }
      // if enableMenuLocale use item.name,
      // close menu international
      const name = menu.disableLocal
        ? item.name
        : formatMessage({ id: locale, defaultMessage: item.name });
      const result = {
        ...item,
        name,
        locale,
        authority: item.authority || parentAuthority,
      };
      if (item.routes) {
        const children = formatter(item.routes, item.authority, locale);
        // Reduce memory usage
        result.children = children;
      }
      delete result.routes;
      return result;
    })
    .filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

/**
 * get SubMenu or Item
 */
const getSubMenu = item => {
  // doc: add hideChildrenInMenu
  if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
    return {
      ...item,
      children: filterMenuData(item.children), // eslint-disable-line
    };
  }
  return item;
};

/**
 * filter menuData
 */
const filterMenuData = menuData => {
  if (!menuData) {
    return [];
  }
  return menuData
    .filter(item => item.name && !item.hideInMenu)
    .map(item => check(item.authority, getSubMenu(item)))
    .filter(item => item);
};
/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
const getBreadcrumbNameMap = menuData => {
  if (!menuData) {
    return {};
  }
  const routerMap = {};

  const flattenMenuData = data => {
    data.forEach(menuItem => {
      if (menuItem.children) {
        flattenMenuData(menuItem.children);
      }
      // Reduce memory usage
      routerMap[menuItem.path] = menuItem;
    });
  };
  flattenMenuData(menuData);
  return routerMap;
};

const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);


const findComponent = (ad, path) => {

  const c = ad.map(e => {
    if (e.path === path) {
      return e.component;
    }
    if (e.children && e.children.length > 0) {
      const temp = findComponent(e.children, path);
      return temp;
    }

  });
  const rc = c.filter(cc => (cc));

  return (rc && rc.length > 0) ? rc[0] : null;
};

const convertMenuComponents = (a, b) => {
  b.forEach(e => {
    if (e.children) {
      convertMenuComponents(a, e.children);
    } else {
      e.component = findComponent(a, e.path);
    }
  });

  return b;
};


export default {
  namespace: 'menu',

  state: {
    menuData: [],
    routerData: [],
    breadcrumbNameMap: {},
    basicMenu: [],
    dataAnalysis: [],
    operationMenu: [],
  },

  effects: {
    * getMenuData({ payload, callback }, { call, put }) {
      const { pathname, routes, authority, path } = payload;
      const originalMenuData = memoizeOneFormatter(routes, authority, path);
      let menuData = [];
      const allMenuData = filterMenuData(originalMenuData);

      const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(originalMenuData);

      const networkMenu = yield call(getMenuData, {});
      let newMenu = {};

      if (networkMenu.head && networkMenu.head.rtnCode === '000000' && networkMenu.body.records.length > 0) {
        newMenu = networkMenu.body.records[0];


        newMenu.basicMenu = convertMenuComponents(allMenuData, newMenu.basicMenu);
        newMenu.dataAnalysis = convertMenuComponents(allMenuData, newMenu.dataAnalysis);
        newMenu.operationMenu = convertMenuComponents(allMenuData, newMenu.operationMenu);


        const t1 = isInMenu(newMenu.basicMenu, pathname);
        const t2 = isInMenu(newMenu.dataAnalysis, pathname);
        const t3 = isInMenu(newMenu.operationMenu, pathname);
        if (!t1 && !t2 && !t3 && pathname !== '/opration' && pathname !== '/introduce') {
          yield put(
            routerRedux.replace({
              pathname: '/403',
              search: stringify({
                redirect: pathname,
              }),
            }),
          );
        }


        if (t1) {
          menuData = newMenu.basicMenu;
        } else if (t2) {
          menuData = newMenu.dataAnalysis;
        } else if (t3) {
          menuData = newMenu.operationMenu;
        }


      }


      yield put({
        type: 'save',
        payload: { menuData, breadcrumbNameMap, routerData: routes, ...newMenu },
      });

      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      // console.log(action.payload)
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
