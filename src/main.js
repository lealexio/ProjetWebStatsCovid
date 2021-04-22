import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";

//allow vue-devtools inspection
Vue.config.devtools = true;

new Vue({ render: h => h(App) }).$mount("#app");
