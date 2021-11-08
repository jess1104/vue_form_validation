<template>
  <div id="app">
    <ui-textbox
      error="The username may not be more than 16 characters"
      help="Pick a unique username not more than 16 characters"
      label="Username"
      placeholder="Enter a username"
      :maxlength="16"
      :invalid="textbox11.length > 16"
      v-model="textbox11"
    ></ui-textbox>
    <ui-textbox
      autocomplete="off"
      error="This field is required"
      help="If you have multiple names, enter the one you prefer"
      label="Name"
      placeholder="Enter your name"
      required
      :invalid="textbox10Touched && textbox10.length === 0"
      @touch="textbox10Touched = true"
      v-model="textbox10"
    ></ui-textbox>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      textbox11: "",
      textbox10: "",
      textbox10Touched: false,
    };
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
