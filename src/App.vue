<template>
    <div id="app" class="app">
        <div class="form">
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
                    :type="form.showType"
                    :invalid="form.isValid === false"
                    @input="validForm(form.alias, $event)"
                    :value="form.value"
                    :disabled="submitted"
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
                    :disabled="submitted"
                ></ui-select>
            </template>
            <ui-button color="green" @click.prevent="submit(forms)"> 送出 </ui-button>
        </div>
        <ul class="content" v-if="submitted">
            <template v-for="form in forms">
                <li v-if="form.type === 'textbox'" :key="form.alias">{{ form.label }} : {{ form.value }}</li>
                <li v-else-if="form.type === 'select'" :key="form.alias">
                    {{ form.label }} : {{ form.value.label }}
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    name: "App",
    data() {
        return {
            submitted: null,
        };
    },
    computed: {
        ...mapState(["forms"]),
    },
    methods: {
        ...mapActions(["setForm"]),
        validForm(alias, value) {
            const aliasData = this.forms.find((item) => item.alias == alias);
            this.setForm({
                alias: alias,
                valid: true,
                value: value,
            });
            // 密碼修改又需驗證
            const confirmData = this.forms.find((item) => item.alias == "confirmPass");
            // console.log(aliasData.alias);
            if (aliasData.alias === "confirmPass") {
                if (aliasData.value !== confirmData.value && confirmData.value.length > 0) {
                    this.setForm({
                        alias: confirmData.alias,
                        valid: false,
                        error: confirmData.error,
                        value: confirmData.value,
                    });
                }
            }
            //先驗證
            aliasData.tests.forEach((element) => {
                if (element.testType == "length") {
                    //長度驗證
                    if (value.length > element.props.maxlen || value.length < element.props.minlen) {
                        this.setForm({
                            alias: alias,
                            valid: false,
                            error: element.error,
                            value: value,
                        });
                    }
                } else if (element.testType == "reg") {
                    //正則驗證
                    const doTest = new RegExp(element.test).test(value);
                    if (!doTest) {
                        this.setForm({
                            alias: alias,
                            valid: false,
                            error: element.error,
                            value: value,
                        });
                    }
                }

                // 確認密碼驗證
                if (element.testType === "confirmPas") {
                    const passwordData = this.forms.find((item) => item.alias === "password");
                    // console.log(passwordData.value);
                    if (value !== passwordData.value || value.length <= 0) {
                        this.setForm({
                            alias: alias,
                            valid: false,
                            error: element.error,
                            value: value,
                        });
                    }
                }
            });
            //當信箱不輸入也可為true
            if (aliasData.alias === "mail") {
                if (aliasData.value.length === 0) {
                    this.setForm({
                        alias: alias,
                        valid: true,
                        value: value,
                    });
                }
            }
        },
        validSelect(alias, value) {
            this.setForm({
                alias: alias,
                value: value,
            });
        },
        submit(value) {
            this.forms.forEach((item) => {
                this.validForm(item.alias, item.value);
            });
            const inValids = this.forms.filter((item) => item.isValid != true); // array
            console.log(inValids.length);
            console.log(value);
            // 全部驗證過為空陣列
            if (inValids.length === 0) {
                this.submitted = true;
                // this.setForm({ disabled: true });
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
