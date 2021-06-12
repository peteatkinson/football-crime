<template>
  <div class="center">
    <vs-dialog
      v-on:close="updateSelectedStadium(null)"
      :width="width"
      v-model="data"
    >
      <template #header>
        <slot name="header"></slot>
      </template>

      <div class="body">
        {{ data }}
        <div class="stadium-details__basic-info">
          <div class="stadium-details__team-crest">
            <div
              v-bind:style="{ backgroundImage: 'url(' + data.stadium.team.crestUrl + ')' }"
              class="stadium-details__team-crest--image"
            ></div>
          </div>

           <div class="stadium-details__stadium-info">
          <h1 class="stadium-details__title">{{data.stadium.name}} - {{data.stadium.team.name}}</h1>
          <span class="text">{{data.stadium.address.street}}, {{data.stadium.address.postcode}}, {{data.stadium.address.country}}</span>
        </div>
           
        </div>
      </div>
    </vs-dialog>
  </div>
</template>
<script>

import { mapActions } from "vuex";

export default {
  props: {
    data: null
  },
  methods: {
    ...mapActions(["updateSelectedStadium"]),
  },
  mounted() {},
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

<style lang="scss">
.body {
  padding: 24px;
  padding-top: 37px;
}
.stadium-details {
  &__title {
    font-size: 23px;
    margin-top: 0;
    margin-bottom: 6px;
    max-width: 65%;
  }
 
  &__team-details {
    margin-left: 16px;
    display: flex;
    flex-direction: column;
  }

  &__basic-info {
    background: rgba(20,20,23, 1);
    padding: 16px;
    border-radius: 5px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &__team-info {
    display: flex;
    flex-direction: row;
  }
  &__stadium-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 12px;
    width: 100%;
  }
  &__team-crest {
    &--image {
      height: 75px;
      width: 75px;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
}

 .text {
      font-size: 14px;
      margin-bottom: 4px;
    }

    .italic {
      font-style: italic;
    }
</style>
