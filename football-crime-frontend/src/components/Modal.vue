<template>
  <div class="center">
    <vs-dialog
      v-on:close="updateSelectedStadium(null)"
      :width="width"
      :scroll="true"
      :not-padding="true"
      :overflow-hidden="true"
      v-model="data"
    >
      <div class="body">
        <div class="stadium-details__basic-info">
          <div class="stadium-details__team-crest">
            <div
              v-bind:style="{
                backgroundImage: 'url(' + data.stadium.team.crestUrl + ')',
              }"
              class="stadium-details__team-crest--image"
            ></div>
          </div>

          <div class="stadium-details__stadium-info">
            <h1 class="stadium-details__title">
              {{ data.stadium.name }} - {{ data.stadium.team.name }}
            </h1>
            <span class="text"
              >{{ data.stadium.address.street }},
              {{ data.stadium.address.postcode }},
              {{ data.stadium.address.country }}</span
            >
          </div>
        </div>

        <div class="stadium-details__section">
          <h1 class="stadium-details__title">Crimes/Incidents</h1>
          <div class="stadium-details__section--content">
            <vs-table v-if="data.crimes.length > 0" class="table" striped>
              <template #thead>
                <vs-tr>
                  <vs-th
                    sort
                    @click="
                      data.crimes = $vs.sortData(
                        $event,
                        data.crimes,
                        'category'
                      )
                    "
                  >
                    Category
                  </vs-th>

                  <vs-th
                    sort
                    @click="
                      data.crimes = $vs.sortData($event, data.crimes, 'when')
                    "
                  >
                    When
                  </vs-th>

                  <vs-th
                    sort
                    @click="
                      data.crimes = $vs.sortData($event, data.crimes, 'where')
                    "
                  >
                    Where
                  </vs-th>

                  <vs-th
                    sort
                    @click="
                      data.crimes = $vs.sortData($event, data.crimes, 'outcome')
                    "
                  >
                    Outcome
                  </vs-th>
                </vs-tr>
              </template>
              <template #tbody>
                <vs-tr :key="i" v-for="(tr, i) in data.crimes" :data="tr">
                  <vs-td>
                    {{ tr.category }}
                  </vs-td>
                  <vs-td>
                    {{ tr.when }}
                  </vs-td>

                  <vs-td>
                    {{ tr.where }}
                  </vs-td>
                  <vs-td>
                    {{ tr.outcome == '' ? 'No outcome' : tr.outcome,  }}
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
            <span v-else class="text">No crimes reported for this Stadium</span>
          </div>
        </div>

        <div class="stadium-details__section">
          <h1 class="stadium-details__title">Squad</h1>
          <div class="stadium-details__section--content">
            <vs-table v-if="data.squad.length > 0" class="table" striped>
              <template #thead>
                <vs-tr>
                  <vs-th
                    sort
                    @click="
                      data.squad = $vs.sortData($event, data.squad, 'name')
                    "
                  >
                    Name
                  </vs-th>

                  <vs-th
                    sort
                    @click="
                      data.squad = $vs.sortData($event, data.squad, 'position')
                    "
                  >
                    Position
                  </vs-th>

                  <vs-th
                    sort
                    @click="
                      data.squad = $vs.sortData(
                        $event,
                        data.squad,
                        'nationality'
                      )
                    "
                  >
                    Nationality
                  </vs-th>

                  <vs-th
                    sort
                    @click="
                      data.squad = $vs.sortData(
                        $event,
                        data.squad,
                        'shirtNumber'
                      )
                    "
                  >
                    Shirt no
                  </vs-th>
                </vs-tr>
              </template>
              <template #tbody>
                <vs-tr :key="i" v-for="(tr, i) in data.squad" :data="tr">
                  <vs-td>
                    {{ tr.name }}
                  </vs-td>
                  <vs-td>
                    {{ tr.position }}
                  </vs-td>

                  <vs-td>
                    {{ tr.nationality }}
                  </vs-td>
                  <vs-td>
                    {{ tr.shirtNumber }}
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
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
    data: null,
  },
  methods: {
    ...mapActions(["updateSelectedStadium"]),
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

<style lang="scss">
.body {
  padding: 24px;
  padding-top: 37px;
}
.stadium-details {
  &__section {
    margin-top: 32px;
    &--content {
      margin-top: 16px;
    }
  }
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
    background: rgba(20, 20, 23, 1);
    padding: 16px;
    border-radius: 5px;
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

.vs-dialog__content {
  max-height: calc(100vh - 200px) !important;
}
</style>
