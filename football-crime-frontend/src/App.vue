<template>
  <div id="app">
    <StadiumCrimeTable></StadiumCrimeTable>
  </div>
</template>

<script>
import StadiumCrimeTable from './components/StadiumCrimeTable.vue'

export default {
  name: 'App',
  components: {
    StadiumCrimeTable
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
</style>
