export default {
  allValid(state) {
    let arr = [
      state.account.isValid,
      state.password.isValid,
      state.confirmPass.isValid,
      state.name.isValid,
      state.email.isValid,
    ];

    return arr.every((validValue) => {
      return validValue === true;
    });
  },
};
