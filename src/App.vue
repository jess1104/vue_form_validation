<template>
  <div id="app" class="app">
    <form>
      <!-- 帳號 -->
      <ui-textbox
        label="帳號"
        help="需輸入4-20碼英文小寫及數字"
        icon="person"
        placeholder="請輸入帳號"
        error="帳號必填，需介於4-20碼之間的英文與數字"
        :invalid="account.isValid !== true"
        :maxlength="20"
        @input="validAccount"
        :value="account.text"
      ></ui-textbox>
      <!-- 密碼 -->
      <ui-textbox
        label="密碼"
        help="需輸入6-20碼英文小寫及數字"
        icon="lock"
        placeholder="請輸入密碼"
        error="密碼必填，需介於6-20碼之間的英文與數字"
        :invalid="password.isValid !== true"
        :maxlength="20"
        @input="validPassword"
        :value="password.text"
      ></ui-textbox>
      <!-- 確認密碼 -->
      <ui-textbox
        label="確認密碼"
        help="需與密碼相同"
        icon="lock"
        placeholder="請確認密碼"
        error="必填，需與密碼相同"
        :invalid="confirmPass.isValid !== true"
        :maxlength="20"
        @input="validConfirmPass"
        :value="confirmPass.text"
      ></ui-textbox>
      <!-- <ui-textbox
        label="姓名"
        help="需輸入姓名，不可輸入數字、空白及特殊符號"
        icon="face"
        placeholder="請確認密碼"
        error="必填項目，不可輸入數字、空白及特殊符號"
        :invalid="textbox11.length > 20 || textbox11.length < 4"
        :maxlength="20"
        v-model="textbox11"
        required
      ></ui-textbox> -->
      <!-- <ui-select
        icon="transgender"
        label="性別"
        placeholder="請選擇性別"
        :options="genderOption"
        v-model="select2o5"
      ></ui-select> -->
      <!-- <ui-textbox
        label="信箱"
        help="請輸入電子信箱"
        icon="mail"
        placeholder="請確認密碼"
        error="必填項目，不可輸入數字、空白及特殊符號"
        :invalid="textbox11.length > 20 || textbox11.length < 4"
        :maxlength="20"
        v-model="textbox11"
        required
      ></ui-textbox> -->
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    ...mapState(["account", "password", "confirmPass"]),
  },
  methods: {
    ...mapActions([
      "setValidAccount",
      "setAccountText",
      "setValidPassword",
      "setPasswordText",
      "setValidConfirmPass",
      "setConfirmText",
    ]),
    validAccount(value) {
      this.setAccountText(value);

      // 判斷長度及有無輸入
      if (value.length > 20 || value.length < 4) {
        this.setValidAccount(false);
        return;
      }
      // 判斷正則英文與數字
      if (/^[a-z0-9]+$/.test(value)) {
        this.setValidAccount(true);
      } else {
        this.setValidAccount(false);
      }
    },
    validPassword(value) {
      this.setPasswordText(value);

      // 判斷長度及有無輸入
      if (value.length > 20 || value.length < 6) {
        this.setValidPassword(false);
        return;
      }
      // 判斷正則英文與數字
      if (/^[a-z0-9]+$/.test(value)) {
        this.setValidPassword(true);
      } else {
        this.setValidAccount(false);
      }
      // 判斷有重新修改密碼後
      if (value !== this.confirmPass.text) {
        this.setValidConfirmPass(false);
      }
    },
    validConfirmPass(value) {
      // 確認有無輸入
      if (value.length === 0) {
        this.setValidConfirmPass(false);
        this.setConfirmText("");
        return;
      }
      this.setConfirmText(value);
      // 與密碼相符發action
      if (value === this.password.text) {
        this.setValidConfirmPass(true);
      } else {
        this.setValidConfirmPass(false);
      }
    },
  },
};
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: 100%;
}
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
form {
  width: 50%;
  margin: 0 auto;
}
.ui-textbox__label {
  align-items: flex-start;
}
.ui-select__label {
  text-align: left;
}
</style>
