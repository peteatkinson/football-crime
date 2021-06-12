<template>
  <div id="app">
    <StadiumCrimeTable />
  </div>
</template>

<script>
import StadiumCrimeTable from './components/StadiumCrimeTable.vue'

import LoadingSpinner from './components/LoadingSpinner.vue'

export default {
  name: 'App',
  components: {
    StadiumCrimeTable
  },
  mounted() {
    this.$vs.setTheme('dark')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
html {
  background: rgb(24, 25, 28);
  color: #fff;
}
</style>
