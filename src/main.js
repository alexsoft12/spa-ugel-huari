import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import CoreuiVue from "@coreui/vue";

import CIcon from "@coreui/icons-vue";
import { iconsSet as icons } from "./assets/icons";
import "./styles/style.scss";
import "bootstrap";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(CoreuiVue);

app.provide("icons", icons);
app.component("CIcon", CIcon);
app.mount("#app");
