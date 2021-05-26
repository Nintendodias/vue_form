<template>
  <section class="section section--form">
    <b-form
      class="form__request"
      @submit.prevent="onSubmit"
      @reset.prevent="onReset"
    >
      <b-form-group id="form-name" label="Ваше ФИО:" label-for="name">
        <b-form-input
          id="name"
          v-model="form.name"
          placeholder="Введите ФИО"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="form-age" label="Сколько вам полных лет:" label-for="age">
        <b-form-input
          id="age"
          v-model="form.age"
          placeholder="Введите возраст"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="form-date"
        label="Выберите дату посещения"
        label-for="date"
      >
        <b-form-datepicker
          id="date"
          v-model="form.calendar"
          start-weekday="1"
          class="form-control"
          menu-class="w-100"
          calendar-width="100%"
          placeholder="Выберите дату"
          :min="today"
          :max="lastDate"
        ></b-form-datepicker>
      </b-form-group>

      <b-form-group
        id="form-time"
        label="Выберите интервал приема"
        label-for="time"
      >
        <b-form-select
          id="time"
          v-model="form.time"
          :options="interval"
          class="form-control"
        ></b-form-select>
      </b-form-group>

      <div class="form__btns">
        <b-button type="submit" variant="primary">Записаться</b-button>
      </div>
    </b-form>
  </section>
</template>

<script>
import Vue from "vue";

//VeeValidate
import VeeValidate from "vee-validate";

Vue.use(VeeValidate, {
  classes: true,
});

export default {
  data() {
    return {
      form: {
        name: "",
        time: null,
        calendar: "",
        age: ""
      },
      interval: [
        { text: "Выберите время:", value: null },
        "9.00 - 10.00",
        "10.00 - 11.00",
        "11.00 - 12.00",
        "12.00 - 13.00",
        "13.00 - 14.00",
        "14.00 - 15.00",
        "15.00 - 16.00",
        "16.00 - 17.00",
        "17.00 - 18.00",
        "18.00 - 19.00",
      ],
      // show: true,
    };
  },
  computed: {
    today() {
      return new Date();
    },
    lastDate() {
      let max = new Date();
      max.setDate(max.getDate() + 14);
      return max;
    },
  },
  methods: {
    onSubmit() {
      //Если пройдет валидацию, то router push, router-link убрать
      alert(JSON.stringify(this.form));
    },
    onReset() {
      this.form.name = "";
      this.form.time = null;
      this.show = false;
      this.data = "";
      // this.$nextTick(() => {
      //   this.show = true;
      // });
    },
  },
};
</script>

<style lang="less">
.section--form {
  label {
    font-size: 1.5em;
    margin-bottom: 0.5em;
  }

  input,
  select,
  option {
    font-size: 1.2em;
    color: #212529 !important;
  }

  .form-group {
    margin-bottom: 2em;

    &#form-date {
      .btn-outline-primary {
        border: 2px solid #0d6efd !important;
      }
      .btn:not(.disabled) {
        font-weight: bold;
      }
    }
  }

  .form__btns {
    .btn {
      width: 100%;
    }
  }
}
</style>
