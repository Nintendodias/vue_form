<template>
  <section class="section section--form">
    <b-form class="form__request" @submit.prevent="onSubmit">
      <b-form-group id="form-name" label="Ваше ФИО:" label-for="name">
        <b-form-input
          id="name"
          name="name"
          v-model="form.name"
          placeholder="Введите ФИО"
          v-validate="'required|fio|alpha_spaces'"
          :state="validateState('name')"
        ></b-form-input>

        <b-form-invalid-feedback id="error-name">{{
          veeErrors.first("name")
        }}</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="form-age"
        label="Сколько вам полных лет:"
        label-for="age"
      >
        <b-form-input
          id="age"
          name="age"
          v-model="form.age"
          placeholder="Введите возраст"
          v-validate="'required|between:0,150'"
          :state="validateState('age')"
        ></b-form-input>

        <b-form-invalid-feedback id="error-age">{{
          veeErrors.first("age")
        }}</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="form-date"
        label="Выберите дату посещения"
        label-for="date"
      >
        <b-form-datepicker
          id="date"
          name="date"
          v-model="form.calendar"
          start-weekday="1"
          class="form-control"
          menu-class="w-100"
          calendar-width="100%"
          placeholder="Выберите дату"
          :min="today"
          :max="lastDate"
          v-validate="'required'"
          :state="validateState('date')"
        ></b-form-datepicker>

        <b-form-invalid-feedback id="error-date">{{
          veeErrors.first("date")
        }}</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="form-time"
        label="Выберите интервал приема"
        label-for="time"
      >
        <b-form-select
          id="time"
          name="time"
          v-model="form.time"
          :options="interval"
          class="form-control"
          v-validate="'required'"
          :state="validateState('time')"
        ></b-form-select>

        <b-form-invalid-feedback id="error-time">{{
          veeErrors.first("time")
        }}</b-form-invalid-feedback>
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
import { Validator } from "vee-validate"; //for custom rule
import axios from "axios";

Vue.use(VeeValidate, {
  classes: true,
  inject: true,
  fieldsBagName: "veeFields",
  errorBagName: "veeErrors",
});

//custom rule for name
Validator.extend("truthy", {
  validate: (value) => fioLength(value),
});

let instance = new Validator({ trueField: "truthy" });

instance.extend("fio", (value) => fioLength(value));

instance.attach({
  name: "falseField",
  rules: "fio",
});

function fioLength(value) {
  let newValue = value.split(" ").filter((item) => item != "").length;
  if (newValue >= 2 && newValue <= 3) return true;
  else return false;
}
//end custom rule for name

//change rule's language

const dictionary = {
  ru: {
    messages: {
      required: "Вы забыли заполнить поле",
      fio: "Введите свое Имя, Фамилию и Отчество (необязательно)",
      alpha_spaces: "В этом поле можно вводить только буквы и пробелы",
      between:
        "Введите число от 0 до 150, если вам больше, извините, мы рады предоставить услуги героям",
    },
  },
};

Validator.localize(dictionary);

const validator = new Validator({ name: "required" });

validator.localize("ru");

//end change rule's language

export default {
  data() {
    return {
      form: {
        name: "",
        time: null,
        calendar: "",
        age: "",
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
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.addToState();
          this.sendRequest();
          this.$router.push({ name: "PageResults" });
          return;
        }
        console.log("Correct them errors!");
      });
    },
    addToState() {
      this.$store.commit("addFormData", {
        name: this.form.name,
        time: this.form.time,
        calendar: this.form.calendar,
        age: this.form.age,
      });
    },
    sendRequest() {
      axios
        .post("https://httpbin.org/post", this.form)
        .then((response) => {
          this.$store.commit("successFormRquest", true);
          console.log('success')
          console.log(response.data);
        })
        .catch((error) => {
          console.log('error')
          console.error(error);
        });
    },
    validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref);
      }
      return null;
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
      .was-validated .form-control:valid,
      .form-control.is-valid {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right calc(0.375em + 0.1875rem) center;
        background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
      }

      .was-validated .form-control:invalid,
      .form-control.is-invalid {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right calc(0.375em + 0.1875rem) center;
        background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
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
