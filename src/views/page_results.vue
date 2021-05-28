<template>
  <section class="section section--result">
    <div class="result__container">
      <h4 class="result__text">Вы успешно записаны на прием!</h4>
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
          "ФИО": this.$store.state.form.name,
          "Возраст": this.$store.state.form.age,
          "Дата приема": this.$store.state.form.calendar,
          "Время приема": this.$store.state.form.time,
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
    background: @color-green;
    border-radius: 20px;
    padding: 0.5em 1em;
    
    .result__text {
      color: @color-white;
    }
  }
}
</style>
