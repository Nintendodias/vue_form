<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
//bootstrap
import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

//VeeValidate

import HelloWorld from "@/components/HelloWorld.vue";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

export default {
  name: "Home",
  components: {
    HelloWorld, 
  },
};
</script>
