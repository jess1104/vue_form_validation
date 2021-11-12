export default {
  SET_VALID_ACCOUNT(state, boolean) {
    state.account.isValid = boolean;
  },
  SET_ACCOUNT_TEXT(state, newAccount) {
    state.account.text = newAccount;
  },
  SET_ACCOUNT_ERROR(state, newError) {
    state.account.error = newError;
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
  SET_VALID_NAME(state, boolean) {
    state.name.isValid = boolean;
  },
  SET_NAME_TEXT(state, newName) {
    state.name.text = newName;
  },
  SET_GENDER(state, genderRes) {
    state.gender = genderRes;
  },
  SET_VALID_MAIL(state, boolean) {
    state.email.isValid = boolean;
  },
  SET_MAIL_TEXT(state, newMail) {
    state.email.text = newMail;
  },
};
