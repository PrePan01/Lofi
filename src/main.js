/*import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')*/

import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App);
app.config.globalProperties.$maxBgNum = "13"
app.config.globalProperties.$audioResourcesMaxNum = "143"

app.use(Antd).mount('#app');

