export default {
    SET_FORM(state, payload) {
        const formIndex = state.forms.findIndex((item) => item.alias === payload.alias);
        state.forms[formIndex]["isValid"] = payload.valid;
        state.forms[formIndex]["value"] = payload.value;
        state.forms[formIndex]["error"] = !payload.valid ? payload.error : "";
    },
};
