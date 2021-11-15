export default {
    forms: [
        {
            type: "textbox",
            alias: "account",
            label: "帳號",
            icon: "person",
            value: "",
            placeholder: "請輸入帳號",
            help: "需輸入4-20碼英文小寫及數字",
            isValid: null,
            error: "",

            tests: [
                {
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
            alias: "password",
            label: "密碼",
            icon: "lock",
            showType: "password",
            value: "",
            placeholder: "請輸入密碼",
            help: "需輸入6-20碼英文小寫及數字",
            isValid: null,
            error: "",
            tests: [
                {
                    testType: "length",
                    props: {
                        minlen: 6,
                        maxlen: 20,
                    },
                    error: "需輸入6-20個字元",
                },
                {
                    testType: "reg",
                    test: /^[a-z0-9]+$/,
                    error: "需輸入英文小寫及數字",
                },
            ],
        },
        {
            type: "textbox",
            alias: "confirmPass",
            label: "確認密碼",
            icon: "lock",
            showType: "password",
            value: "",
            placeholder: "請確認密碼",
            help: "需與密碼相符",
            isValid: null,
            error: "",
            tests: [
                {
                    testType: "confirmPas",
                    error: "需與密碼相符",
                },
            ],
        },
        {
            type: "textbox",
            alias: "name",
            label: "姓名",
            icon: "face",
            value: "",
            placeholder: "請輸入姓名",
            help: "需輸入姓名，不可輸入數字、空白及特殊符號",
            isValid: null,
            error: "",
            tests: [
                {
                    testType: "reg",
                    test: /^[a-zA-Z\u4E00-\u9FA5]+$/,
                    error: "必填，不許輸入數字及特殊符號",
                },
            ],
        },
        {
            type: "select",
            alias: "gender",
            label: "性別",
            icon: "transgender",
            value: "",
            isValid: true,
            error: "",
            option: [
                {
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
        {
            type: "textbox",
            alias: "mail",
            label: "信箱",
            icon: "mail",
            value: "",
            placeholder: "請輸入信箱",
            help: "選填，請輸入有效信箱",
            isValid: true,
            error: "",
            tests: [
                {
                    testType: "nolength",
                },
                {
                    testType: "reg",
                    test: /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
                    error: "請輸入正確的信箱",
                },
            ],
        },
    ],
};
