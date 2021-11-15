<template>
    <div id="app" class="app">
        <div class="form">
            <template v-for="form in forms">
                <!-- textbox -->
                <ui-textbox
                    v-if="form.uiType == 'textbox'"
                    :key="form.alias"
                    :label="form.label"
                    :icon="form.icon"
                    :placeholder="form.placeholder"
                    :help="form.help"
                    :error="form.error"
                    :invalid="form.isValid === false"
                    @input="validForm(form.alias, $event)"
                    :value="form.value"
                    :type="form.type"
                    :disabled="form.disabled"
                ></ui-textbox>
                <!-- select -->
                <ui-select
                    v-else-if="form.uiType == 'select'"
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
            <ui-button color="green" @click="submit(allValid)">
                送出
            </ui-button>
        </div>
        <ul class="content" v-if="submitted">
            <template v-for="form in forms">
                <li v-if="form.type === 'textbox'" :key="form.alias">
                    {{ form.label }} : {{ form.value }}
                </li>
                <li v-else-if="form.type === 'select'" :key="form.alias">
                    {{ form.label }} : {{ form.value.label }}
                </li>
            </template>
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
            "forms",
            // "account",
            // "password",
            // "confirmPass",
            // "name",
            // "gender",
            // "genderOption",
            // "email",
        ]),
        // 所有的有效判斷結果
        ...mapGetters(["allValid"]),
    },
    methods: {
        ...mapActions(["setForm"]),
        validForm(alias, value) {
            const aliasData = this.forms.find((item) => item.alias === alias);
            // console.log(aliasData);
            // console.log(value);
            // 先入值
            this.setForm({
                alias: alias,
                valid: true,
                value: value,
            });
            aliasData.tests.forEach((element) => {
                if (element.testType === "length") {
                    //長度驗證
                    if (
                        value.length > element.props.maxlen ||
                        value.length < element.props.minlen
                    ) {
                        this.setForm({
                            alias: alias,
                            valid: false,
                            error: element.error,
                            value: value,
                        });
                    }
                } else if (element.testType === "reg") {
                    //正則驗證
                    const doTest = new RegExp(element.test, "i").test(value);
                    if (!doTest) {
                        this.setForm({
                            alias: alias,
                            valid: false,
                            error: element.error,
                            value: value,
                        });
                    }
                }
                //     // 確認密碼驗證
                //     if (element.testType === "confirmPas") {
                //         const passwordValue = this.forms.find(
                //             (item) => item.alias === "password"
                //         );
                //         console.log(passwordValue);
                //     }
            });
        },
        validSelect(alias, value) {
            console.log(alias);
            console.log(value);
        },
        // onAccountInput(value) {
        //   let payload = { account: { value, result: null } };
        //   this.setAll(payload);
        //   // 判斷長度及有無輸入
        //   if (value.length > 20 || value.length < 4) {
        //     let payload = { account: { value, result: false } };
        //     this.setAll(payload);
        //     return;
        //   }
        //   // 判斷正則英文與數字
        //   if (/^[a-z0-9]+$/.test(value)) {
        //     let payload = { account: { value, result: true } };
        //     this.setAll(payload);
        //   } else {
        //     let payload = { account: { value, result: false } };
        //     this.setAll(payload);
        //   }
        // },
        // onPasswordInput(value) {
        //   let payload = { method: "password", value, result: null };
        //   this.setAll(payload);
        //   // 判斷有重新修改密碼後
        //   if (value !== this.confirmPass.text) {
        //     let payload = { method: "password", value, result: false };
        //     this.setAll(payload);
        //   }
        //   // 判斷長度及有無輸入
        //   if (value.length > 20 || value.length < 6) {
        //     let payload = { method: "password", value, result: false };
        //     this.setAll(payload);
        //     return;
        //   }
        //   // 判斷正則英文與數字
        //   if (/^[a-z0-9]+$/.test(value)) {
        //     let payload = { method: "password", value, result: true };
        //     this.setAll(payload);
        //   } else {
        //     let payload = { method: "password", value, result: false };
        //     this.setAll(payload);
        //   }
        // },
        // onConfirmPassInput(value) {
        //   this.setConfirmText(value);
        //   // 與密碼相符發action
        //   if (value === this.password.text) {
        //     this.setValidConfirmPass(true);
        //   } else {
        //     this.setValidConfirmPass(false);
        //   }
        //   // 確認有無輸入
        //   if (value.length === 0) {
        //     this.setValidConfirmPass(false);
        //     return;
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
