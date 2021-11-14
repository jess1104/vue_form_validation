<template>
  <div id="app" class="app">
    <form>
      <template v-for="form in forms">
        <!-- textbox -->
        <ui-textbox
          v-if="form.type == 'textbox'"
          :key="form.alias"
          :label="form.label"
          :icon="form.icon"
          :placeholder="form.placeholder"
          :help="form.help"
          :error="form.error"
          :invalid="!form.isValid"
          @input="validForm(form.alias, $event)"
          :value="form.value"
          :disabled="form.disabled"
        ></ui-textbox>

        <!-- select -->
        <ui-select
          v-else-if="form.type == 'select'"
          :key="form.alias"
          :label="form.label"
          :icon="form.icon"
          :placeholder="form.placeholder"
          :options="form.option"
          @input="validSelect(form.alias, $event)"
          :value="form.value"
          :disabled="form.disabled"
        ></ui-select>
      </template>
      <ui-button color="green" @click.prevent="submit(forms)">送出</ui-button>
    </form>
    <ul class="content" v-if="submitVal">
      <template v-for="form in forms">
        <li v-if="form.type == 'textbox'" :key="form.alias">
          {{ form.label }} : {{ form.value }}
        </li>
        <li v-else-if="form.type == 'select'" :key="form.alias">
          {{ form.label }} : {{ form.value.label }}
        </li>
      </template>
      <!-- <li>帳號:{{ account.text }}</li>
      <li>密碼:{{ password.text }}</li>
      <li>姓名:{{ name.text }}</li>
      <li v-if="gender">性別:{{ gender }}</li>
      <li v-if="email.text">信箱:{{ email.text }}</li> -->
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "App",
  data() {
    return {
      submitVal: null,
    };
  },
  computed: {
    ...mapState([
      "forms",
      // "account",
      // "password",
      // "confirmPass",
      // "name",
      // "gender",
      // "genderOption",
      // "email",
    ]),
    ...mapGetters(["allValid"]),
  },
  methods: {
    ...mapActions([
      "setForm",
      // "setValidAccount",
      // "setAccountText",
      // "setValidPassword",
      // "setPasswordText",
      // "setValidConfirmPass",
      // "setConfirmText",
      // "setValidName",
      // "setNameText",
      // "setGender",
      // "setValidMail",
      // "setMailText",
    ]),
    validForm(alias, value) {
      const aliasData = this.forms.find(item => item.alias == alias);

      this.setForm({
        'alias': alias,
        'valid': true,
        'value': value
      });

      //先驗證
      aliasData.tests.forEach(element => {
        if (element.testType == 'length') {//長度驗證
          if (value.length > element.props.maxlen || value.length < element.props.minlen) {
            this.setForm({
              'alias': alias,
              'valid': false,
              'error': element.error,
              'value': value
            });
          }
        } else if (element.testType == 'reg') { //正則驗證
          const doTest = new RegExp(element.test, 'i').test(value);
          if (!doTest) {
            this.setForm({
              'alias': alias,
              'valid': false,
              'error': element.error,
              'value': value
            });
          }
        }
      });

    },
    validSelect(alias, value) {
      this.setForm({
        'alias': alias,
        'value': value
      });
    },
    // validAccount(value) {
    //   this.setAccountText(value);

    //   // 判斷長度及有無輸入
    //   if (value.length > 20 || value.length < 4) {
    //     this.setValidAccount(false);
    //     return;
    //   }
    //   // 判斷正則英文與數字
    //   if (/^[a-z0-9]+$/.test(value)) {
    //     this.setValidAccount(true);
    //   } else {
    //     this.setValidAccount(false);
    //   }
    // },
    // validPassword(value) {
    //   this.setPasswordText(value);

    //   // 判斷長度及有無輸入
    //   if (value.length > 20 || value.length < 6) {
    //     this.setValidPassword(false);
    //     return;
    //   }
    //   // 判斷正則英文與數字
    //   if (/^[a-z0-9]+$/.test(value)) {
    //     this.setValidPassword(true);
    //   } else {
    //     this.setValidPassword(false);
    //   }
    //   // 判斷有重新修改密碼後
    //   if (value !== this.confirmPass.text) {
    //     this.setValidConfirmPass(false);
    //   }
    // },
    // validConfirmPass(value) {
    //   this.setConfirmText(value);
    //   // 確認有無輸入
    //   if (value.length === 0) {
    //     this.setValidConfirmPass(false);
    //     return;
    //   }
    //   // 與密碼相符發action
    //   if (value === this.password.text) {
    //     this.setValidConfirmPass(true);
    //   } else {
    //     this.setValidConfirmPass(false);
    //   }
    // },
    // validName(value) {
    //   this.setNameText(value);
    //   // 確認有無輸入
    //   if (value.length === 0) {
    //     this.setValidName(false);
    //     return;
    //   }
    //   if (/^[a-zA-Z\u4E00-\u9FA5]+$/.test(value)) {
    //     this.setValidName(true);
    //   } else {
    //     this.setValidName(false);
    //   }
    // },
    // changeGender(genderRes) {
    //   this.setGender(genderRes);
    // },
    // validMail(value) {
    //   this.setMailText(value);
    //   // 不輸入也可
    //   if (value.length === 0) {
    //     this.setValidMail(true);
    //     return;
    //   }
    //   // 驗證mail
    //   let emailRule =
    //     /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    //   if (emailRule.test(value)) {
    //     this.setValidMail(true);
    //   } else {
    //     this.setValidMail(false);
    //   }
    // },
    submit(value) {
      this.forms.forEach(item => {
        this.validForm(item.alias, item.value);
      })

      const inValids = this.forms.filter(item => item.isValid != true); // array 
      if (inValids.length >= 0) { //有一個是沒驗證通過
        //沒驗證通過
      } else {
        // console.log("allValid:" + value);
        this.submitVal = value;
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
