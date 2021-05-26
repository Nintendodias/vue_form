<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <ValidationProvider rules="secret" v-slot="{ errors }">
      <input v-model="email" type="text" />
      <span>{{ errors[0] }}</span>
    </ValidationProvider>
  </div>
</template>

<script>
//bootstrap
import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

//VeeValidate
import { ValidationProvider, extend } from "vee-validate";

import HelloWorld from "@/components/HelloWorld.vue";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.use(ValidationProvider);
extend('secret', {
  validate: value => value === 'example',
  message: 'This is not the magic word'
});

export default {
  name: "Home",
  components: {
    HelloWorld,
    ValidationProvider,
  },
};
</script>
