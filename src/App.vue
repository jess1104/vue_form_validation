<template>
  <div id="app" class="app">
    <div class="form">
      <!-- 帳號 -->
      <ui-textbox
        label="帳號"
        icon="person"
        placeholder="請輸入帳號"
        help="需輸入4-20碼英文小寫及數字"
        :error="account.error"
        :invalid="account.isValid === false"
        :maxlength="20"
        @input="onAccountInput"
        :value="account.text"
        :disabled="submitted"
      ></ui-textbox>
      <!-- 密碼 -->
      <ui-textbox
        label="密碼"
        icon="lock"
        type="password"
        placeholder="請輸入密碼"
        help="需輸入6-20碼英文小寫及數字"
        error="密碼必填，需介於6-20碼之間的英文小寫與數字"
        :invalid="password.isValid === false"
        :maxlength="20"
        @input="onPasswordInput"
        :value="password.text"
        :disabled="submitted"
      ></ui-textbox>
      <!-- 確認密碼 -->
      <!-- <ui-textbox
        label="確認密碼"
        icon="lock"
        type="password"
        placeholder="請確認密碼"
        help="需與密碼相同"
        error="必填，需與密碼相同"
        :invalid="confirmPass.isValid === false"
        :maxlength="20"
        @input="onConfirmPassInput"
        :value="confirmPass.text"
        :disabled="submitted"
      ></ui-textbox> -->
      <!-- 姓名 -->
      <!-- <ui-textbox
        label="姓名"
        icon="face"
        placeholder="請輸入姓名"
        help="需輸入姓名，不可輸入數字、空白及特殊符號"
        error="必填，不可輸入數字、空白及特殊符號"
        :invalid="name.isValid === false"
        @input="validName"
        :value="name.text"
        :disabled="submitted"
      ></ui-textbox>
      <ui-select
        label="性別"
        icon="transgender"
        placeholder="請選擇性別"
        :options="genderOption"
        @change="changeGender"
        :value="gender"
        :disabled="submitted"
      ></ui-select>
      <ui-textbox
        label="信箱"
        icon="mail"
        placeholder="請輸入信箱"
        help="請輸入電子信箱"
        error="選填，請輸入正確的e-mail"
        :invalid="email.isValid === false"
        @input="validMail"
        :value="email.text"
        :disabled="submitted"
      ></ui-textbox>
      <ui-button color="green" @click="submit(allValid)"> 送出 </ui-button> -->
    </div>
    <ul class="content" v-if="submitted">
      <li>客戶資料:</li>
      <li>帳號:{{ account.text }}</li>
      <li>密碼:{{ password.text }}</li>
      <li>姓名:{{ name.text }}</li>
      <li v-if="gender">性別:{{ gender }}</li>
      <li v-if="email.text">信箱:{{ email.text }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "App",
  data() {
    return {
      submitted: null,
    };
  },
  computed: {
    ...mapState([
      "account",
      "password",
      "confirmPass",
      "name",
      "gender",
      "genderOption",
      "email",
    ]),
    // 所有的有效判斷結果
    ...mapGetters(["allValid"]),
  },
  methods: {
    ...mapActions(["setAll"]),

    onAccountInput(value) {
      let payload = { account: { value, result: null } };
      this.setAll(payload);
      // 判斷長度及有無輸入
      if (value.length > 20 || value.length < 4) {
        let payload = { account: { value, result: false } };
        this.setAll(payload);
        return;
      }
      // 判斷正則英文與數字
      if (/^[a-z0-9]+$/.test(value)) {
        let payload = { account: { value, result: true } };
        this.setAll(payload);
      } else {
        let payload = { account: { value, result: false } };
        this.setAll(payload);
      }
    },
    onPasswordInput(value) {
      let payload = { method: "password", value, result: null };
      this.setAll(payload);
      // 判斷有重新修改密碼後
      if (value !== this.confirmPass.text) {
        let payload = { method: "password", value, result: false };
        this.setAll(payload);
      }
      // 判斷長度及有無輸入
      if (value.length > 20 || value.length < 6) {
        let payload = { method: "password", value, result: false };
        this.setAll(payload);
        return;
      }
      // 判斷正則英文與數字
      if (/^[a-z0-9]+$/.test(value)) {
        let payload = { method: "password", value, result: true };
        this.setAll(payload);
      } else {
        let payload = { method: "password", value, result: false };
        this.setAll(payload);
      }
    },
    onConfirmPassInput(value) {
      this.setConfirmText(value);
      // 與密碼相符發action
      if (value === this.password.text) {
        this.setValidConfirmPass(true);
      } else {
        this.setValidConfirmPass(false);
      }
      // 確認有無輸入
      if (value.length === 0) {
        this.setValidConfirmPass(false);
        return;
      }
    },
    validName(value) {
      this.setNameText(value);
      // 確認有無輸入
      if (value.length === 0) {
        this.setValidName(false);
        return;
      }
      if (/^[a-zA-Z\u4E00-\u9FA5]+$/.test(value)) {
        this.setValidName(true);
      } else {
        this.setValidName(false);
      }
    },
    changeGender(genderRes) {
      this.setGender(genderRes);
    },
    validMail(value) {
      this.setMailText(value);
      // 不輸入也可
      if (value.length === 0) {
        this.setValidMail(true);
        return;
      }
      // 驗證mail
      let emailRule =
        /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
      if (emailRule.test(value)) {
        this.setValidMail(true);
      } else {
        this.setValidMail(false);
      }
    },
    submit(value) {
      // console.log("allValid:" + value);
      this.submitted = value;
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
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 50%;
  margin: 0 auto;
  margin-top: 50px;
  padding: 10px;
  list-style: none;
  background: #4caf50;
  border-radius: 10px;
  color: #fff;
  font-weight: 800;
}
li {
  padding: 10px;
}
li:first {
  font-size: 20px;
}

.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.form {
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
