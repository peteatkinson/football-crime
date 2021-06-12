<template>
  <div id="app">
     <Modal :data="selectedStadium" v-if="!loading && selectedStadium != null" />
     <div v-if="loading">
      <LoadingSpinner />
    </div>
    <StadiumTable />
</div>
</template>

<script>
import StadiumTable from './components/StadiumTable.vue'

import LoadingSpinner from './components/LoadingSpinner.vue'

import Modal from './components/Modal.vue'

import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState(['loading', 'selectedStadium'])
  },
  components: {
    StadiumTable,
    LoadingSpinner,
    Modal
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
