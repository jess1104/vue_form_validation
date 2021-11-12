export default {
  setAccount(
    { commit },
    { boolean: newBoolean, account: newAccount, error: newError }
  ) {
    console.log(newBoolean, newAccount, newError);
    commit("SET_VALID_ACCOUNT", newBoolean);
    commit("SET_ACCOUNT_TEXT", newAccount);
    commit("SET_ACCOUNT_ERROR", newError);
  },
  // setValidAccount({ commit }, boolean) {
  // },
  // setAccountText({ commit }, newAccount) {
  // },
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
  setValidName({ commit }, boolean) {
    commit("SET_VALID_NAME", boolean);
  },
  setNameText({ commit }, newName) {
    commit("SET_NAME_TEXT", newName);
  },
  setGender({ commit }, genderRes) {
    commit("SET_GENDER", genderRes);
  },
  setValidMail({ commit }, boolean) {
    commit("SET_VALID_MAIL", boolean);
  },
  setMailText({ commit }, newMail) {
    commit("SET_MAIL_TEXT", newMail);
  },
};
