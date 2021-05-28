import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    form: {
      name: "",
      time: null,
      calendar: "",
      age: "",
    },
  },
  mutations: {
    addFormData(state, {name, time, calendar, age}) {
      state.form.name = name;
      state.form.time = time;
      state.form.calendar = calendar;
      state.form.age = age;
    }
  }
});
