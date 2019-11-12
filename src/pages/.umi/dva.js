import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'dev', ...(require('/Users/chensongbin/Documents/GitHub/jewelry/src/models/dev.js').default) });
app.model({ namespace: 'global', ...(require('/Users/chensongbin/Documents/GitHub/jewelry/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('/Users/chensongbin/Documents/GitHub/jewelry/src/models/list.js').default) });
app.model({ namespace: 'login', ...(require('/Users/chensongbin/Documents/GitHub/jewelry/src/models/login.js').default) });
app.model({ namespace: 'menu', ...(require('/Users/chensongbin/Documents/GitHub/jewelry/src/models/menu.js').default) });
app.model({ namespace: 'project', ...(require('/Users/chensongbin/Documents/GitHub/jewelry/src/models/project.js').default) });
app.model({ namespace: 'quote', ...(require('/Users/chensongbin/Documents/GitHub/jewelry/src/models/quote.js').default) });
app.model({ namespace: 'setting', ...(require('/Users/chensongbin/Documents/GitHub/jewelry/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('/Users/chensongbin/Documents/GitHub/jewelry/src/models/user.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
