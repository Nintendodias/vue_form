<template>
  <section class="section section--result">
    <div class="result__container" :class="{ _success: this.$store.state.isFormSuccess == true }">
      <h4 class="result__text"></h4>
    </div>
    <b-table striped hover :items="items"></b-table>
  </section>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          "ФИО": this.$store.state.form.name ? this.$store.state.form.name : 'Нет данных',
          "Возраст": this.$store.state.form.age ? this.$store.state.form.age : 'Нет данных',
          "Дата приема": this.$store.state.form.calendar ? this.$store.state.form.calendar : 'Нет данных',
          "Время приема": this.$store.state.form.time ? this.$store.state.form.time : 'Нет данных',
        },
      ],
    };
  },
};
</script>

<style lang="less" scope>
@import "../scss/variables.less";
.section--result {
  .result__container {
    margin-bottom: 2em;
    background: @color-red;
    border-radius: 20px;
    padding: 0.5em 1em;
    
    .result__text {
      color: @color-white;

      &:before {
        content: 'Регистрация прошла с ошибкой';
        font-size: inherit;
        color: inherit;
      }
    }

    &._success {
      background: @color-green;

      .result__text:before {
        content: 'Вы успешно записаны на прием!';
      }
    }
  }
}
</style>
