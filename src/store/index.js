import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    account: {
      text: "",
      isValid: true,
    },
    password: {
      text: "",
      isValid: true,
    },
    confirmPass: {
      text: "",
      isValid: true,
    },

    name: "",
    gender: "",
    genderOption: ["男", "女"],
    emailText: "",
  },
  mutations: {
    SET_VALID_ACCOUNT(state, boolean) {
      state.account.isValid = boolean;
    },
    SET_ACCOUNT_TEXT(state, newAccount) {
      state.account.text = newAccount;
    },
    SET_VALID_PASSWPRD(state, boolean) {
      state.password.isValid = boolean;
    },
    SET_PASSWORD_TEXT(state, newPassword) {
      state.password.text = newPassword;
    },
    SET_VALID_CONFIRM_PASS(state, boolean) {
      state.confirmPass.isValid = boolean;
    },
    SET_CONFIRM_TEXT(state, newConfirm) {
      state.confirmPass.text = newConfirm;
    },
  },
  actions: {
    setValidAccount({ commit }, boolean) {
      console.log(boolean);
      commit("SET_VALID_ACCOUNT", boolean);
    },
    setAccountText({ commit }, newAccount) {
      commit("SET_ACCOUNT_TEXT", newAccount);
    },
    setValidPassword({ commit }, boolean) {
      commit("SET_VALID_PASSWPRD", boolean);
    },
    setPasswordText({ commit }, newPassword) {
      commit("SET_PASSWORD_TEXT", newPassword);
    },
    setValidConfirmPass({ commit }, boolean) {
      commit("SET_VALID_CONFIRM_PASS", boolean);
    },
    setConfirmText({ commit }, newConfirm) {
      commit("SET_CONFIRM_TEXT", newConfirm);
    },
  },
  modules: {},
});
