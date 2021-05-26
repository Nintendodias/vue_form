<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">MAIN</router-link> |
      <router-link to="/results">RESULTS</router-link>
    </div>
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<style lang="less">
@import "./scss/animation.less";


#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
