export default {
  setAll({ commit }, payload) {
    console.log(payload);
    console.log(commit);
    commit("SET_VALID_ACCOUNT", payload.account.result);
    commit("SET_ACCOUNT_TEXT", payload.account.value);

    if (payload.method === "password") {
      commit("SET_VALID_PASSWPRD", payload.result);
      commit("SET_PASSWORD_TEXT", payload.value);
    }
  },
  // setValidAccount({ commit }, boolean) {
  // commit("SET_VALID_ACCOUNT", boolean);
  // },
  // setAccountText({ commit }, newAccount) {
  // commit("SET_ACCOUNT_TEXT", newAccount);
  // },
  // setValidPassword({ commit }, boolean) {
  //   commit("SET_VALID_PASSWPRD", boolean);
  // },
  // setPasswordText({ commit }, newPassword) {
  //   commit("SET_PASSWORD_TEXT", newPassword);
  // },
  // setValidConfirmPass({ commit }, boolean) {
  //   commit("SET_VALID_CONFIRM_PASS", boolean);
  // },
  // setConfirmText({ commit }, newConfirm) {
  //   commit("SET_CONFIRM_TEXT", newConfirm);
  // },
  // setValidName({ commit }, boolean) {
  //   commit("SET_VALID_NAME", boolean);
  // },
  // setNameText({ commit }, newName) {
  //   commit("SET_NAME_TEXT", newName);
  // },
  // setGender({ commit }, genderRes) {
  //   commit("SET_GENDER", genderRes);
  // },
  // setValidMail({ commit }, boolean) {
  //   commit("SET_VALID_MAIL", boolean);
  // },
  // setMailText({ commit }, newMail) {
  //   commit("SET_MAIL_TEXT", newMail);
  // },
};
