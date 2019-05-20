import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'global', ...(require('G:/htmlproject/jewelry5_g/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('G:/htmlproject/jewelry5_g/src/models/list.js').default) });
app.model({ namespace: 'login', ...(require('G:/htmlproject/jewelry5_g/src/models/login.js').default) });
app.model({ namespace: 'menu', ...(require('G:/htmlproject/jewelry5_g/src/models/menu.js').default) });
app.model({ namespace: 'project', ...(require('G:/htmlproject/jewelry5_g/src/models/project.js').default) });
app.model({ namespace: 'setting', ...(require('G:/htmlproject/jewelry5_g/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('G:/htmlproject/jewelry5_g/src/models/user.js').default) });
