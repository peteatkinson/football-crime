<template>
  <div class="table">
    <vs-table class="table" striped v-model="selected">
      <template #header>
        <Filters
          :callback="request"
          default-month="01"
          default-year="2021"
          :total-count="rows.length"
        />
      </template>
      <template #thead>
        <vs-tr>
          <vs-th sort @click="rows = $vs.sortData($event, rows, 'stadium')">
            Stadium
          </vs-th>

          <vs-th sort @click="rows = $vs.sortData($event, rows, 'street')">
            Address
          </vs-th>

          <vs-th sort @click="rows = $vs.sortData($event, rows, 'crimesCount')">
            Crimes
          </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
          :key="i"
          v-for="(tr, i) in rows"
          :data="tr"
          :is-selected="selected == tr"
        >
          <vs-td>
            {{ tr.stadium }}
          </vs-td>
          <vs-td>
            {{ tr.team }}
          </vs-td>
          <vs-td>
            {{ tr.crimesCount }}
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
import Filters from "./Filters.vue";
import { mapActions, mapState } from "vuex";
import { ApiClient } from "../api/api-client";
import LoadingMixin from "../mixins/LoadingMixin";

export default {
  name: "StadiumTable",
  mixins: [LoadingMixin],
  components: {
    Filters,
  },
  watch: {
    selected() {
      this.toggleSpinner();

      const stadium = this.stadiumCrimes.filter(
        (sc) => sc.stadium.id == this.selected.id
      )[0];
      if (stadium != null) {
        //  update selected stadium
        this.apiClient
          .getTeam(this.selected.id)
          .then((response) => {
            const { data } = response;
            stadium["squad"] = data.squad
            this.toggleSpinner();
          })
          .catch((err) => {
            this.toggleSpinner();
          });

        this.updateSelectedStadium(stadium);
      } else {
        this.toggleSpinner();
      }

    },
  },
  methods: {
    ...mapActions(["updateStadiumCrimes", "updateSelectedStadium"]),
    beforeMount() {
      this.request("2021", "01");
    },
    request(year, month) {
      this.toggleSpinner();
      this.apiClient
        .getStadiumCrimes(year, month)
        .then((response) => {
          this.updateStadiumCrimes(response.data);
          this.rows = this.stadiumCrimes.map((sc) => {
            const { stadium, crimes } = sc;

            return {
              id: stadium.id,
              stadium: stadium.name,
              street: stadium.address.street,
              crimesCount: crimes.length,
              team: stadium.team.name,
              teamCrestUrl: stadium.team.crestUrl,
            };
          });
          this.toggleSpinner();
        })
        .catch((err) => {
          this.toggleSpinner();
        });
    },
  },
  computed: {
    ...mapState(["loading", "stadiumCrimes"]),
  },
  data() {
    return {
      selected: null,
      rows: [],
      apiClient: new ApiClient(this.axios),
    };
  },
};
</script>

<style lang="scss">
::v-deep .vs-table__th {
  display: none !important;
  .vs-table__th__content {
    display: none;
  }
}

table {
  color: #fff;
}
</style>
