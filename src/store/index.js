import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        forms: [{
                type: "textbox",
                alias: "account",
                label: "帳號",
                icon: "person",
                value: "",
                placeholder: "請輸入帳號",
                help: "需輸入4-20碼英文小寫及數字",
                isValid: null,
                disabled: false,
                error: "",
                tests: [{
                        testType: "length",
                        props: {
                            minlen: 4,
                            maxlen: 20,
                        },
                        error: "請輸入4-20個字元",
                    },
                    {
                        testType: "reg",
                        test: /^[a-z0-9]+$/,
                        error: "請輸入英文小寫及數字",
                    },
                ],
            },
            {
                type: "textbox",
                alias: "address",
                label: "住址",
                icon: "person",
                value: "",
                placeholder: "請輸入住址",
                help: "需輸入4-20碼英文小寫及數字",
                isValid: null,
                disabled: false,
                error: "",
                tests: [{
                        testType: "length",
                        props: {
                            minlen: 4,
                            maxlen: 20,
                        },
                        error: "請輸入4-20個字元",
                    },
                    {
                        testType: "confirmPas",
                        error: "請輸入英文小寫及數字",
                    },
                ],
            },
            {
                type: "select",
                alias: "gender",
                label: "性別",
                icon: "transgender",
                value: "",
                isValid: null,
                disabled: false,
                error: "",
                option: [{
                        label: "-",
                        value: "",
                    },
                    {
                        label: "男",
                        value: 0,
                    },
                    {
                        label: "女",
                        value: 1,
                    },
                ],
                tests: [],
            },
        ],

        account: {
            text: "",
            isValid: null,
        },
        password: {
            text: "",
            isValid: null,
        },
        confirmPass: {
            text: "",
            isValid: null,
        },
        name: {
            text: "",
            isValid: null,
        },
        email: {
            text: "",
            isValid: true,
        },
        gender: "",
        genderOption: ["男", "女", "中"],
    },
    getters: {
        allValid(state) {
            let arr = [
                state.account.isValid,
                state.password.isValid,
                state.confirmPass.isValid,
                state.name.isValid,
                state.email.isValid,
            ]

            return arr.every((validValue) => {
                return validValue === true
            })
        },
    },
    mutations: {
        SET_FORM(state, payload) {
            const formIndex = state.forms.findIndex(
                (item) => item.alias == payload.alias
            )
            state.forms[formIndex]["isValid"] = payload.valid
            state.forms[formIndex]["value"] = payload.value
            state.forms[formIndex]["error"] = !payload.valid ? payload.error : ""
        },
        // SET_VALID_ACCOUNT(state, boolean) {
        //     state.account.isValid = boolean
        // },
        // SET_ACCOUNT_TEXT(state, newAccount) {
        //     state.account.text = newAccount
        // },
        // SET_VALID_PASSWPRD(state, boolean) {
        //     state.password.isValid = boolean
        // },
        // SET_PASSWORD_TEXT(state, newPassword) {
        //     state.password.text = newPassword
        // },
        // SET_VALID_CONFIRM_PASS(state, boolean) {
        //     state.confirmPass.isValid = boolean
        // },
        // SET_CONFIRM_TEXT(state, newConfirm) {
        //     state.confirmPass.text = newConfirm
        // },
        // SET_VALID_NAME(state, boolean) {
        //     state.name.isValid = boolean
        // },
        // SET_NAME_TEXT(state, newName) {
        //     state.name.text = newName
        // },
        // SET_GENDER(state, genderRes) {
        //     state.gender = genderRes
        // },
        // SET_VALID_MAIL(state, boolean) {
        //     state.email.isValid = boolean
        // },
        // SET_MAIL_TEXT(state, newMail) {
        //     state.email.text = newMail
        // },
    },
    actions: {
        setForm({ commit }, payload) {
            commit("SET_FORM", payload)
        },
        // set({ commit, state }, payload) {},
        // setValidAccount({ commit }, boolean) {
        //   commit("SET_VALID_ACCOUNT", boolean);
        // },
        // setAccountText({ commit }, newAccount) {
        //   commit("SET_ACCOUNT_TEXT", newAccount);
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
    },
})