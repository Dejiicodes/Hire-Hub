import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/styles.css"; // Import global styles
import "@coreui/coreui/dist/css/coreui.min.css";
import { createPinia } from "pinia"; // Import createPinia

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);
createApp(App).use(router).mount("#app");
