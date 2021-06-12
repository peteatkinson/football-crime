<template>
  <div class="center">
    <vs-dialog v-on:close="updateSelectedStadium(null)" :width="width" v-model="data">
      <template #header>
        <slot name="header"></slot>
      </template>

      <div class="body">
        <slot name="body"></slot>
      </div>
    </vs-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  props: {
    data: null
  },
  methods: {
    ...mapActions(['updateSelectedStadium'])
  },
  computed: {

    width() {
      switch (this.$mq) {
        case "sm":
        case "sm2":
          return "400px";
        case "lg":
          return "760px";
        default:
          return "760px";
      }
    },
  },
};
</script>
