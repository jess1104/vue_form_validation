import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import KeenUI from "keen-ui";
import "keen-ui/dist/keen-ui.css";

Vue.use(KeenUI);

new Vue({
  components: {
    // all Keen UI components already registered
  },
});

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
