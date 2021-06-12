<template>
  <div class="table">
    <div v-if="loading" class="table__loading-spinner--mask">
      <LoadingSpinner />
    </div>

    <vs-table striped v-model="selected">
      <template #header>
        <Filters
          :filter-callback-handler="getStadiumCrimesByYearMonth"
          default-month="01"
          default-year="2021"
          :total-count="rows.length"
        />
      </template>
      <template #thead>
        <vs-tr>
          <vs-th sort @click="rows = $vs.sortData($event, rows, 'stadiumName')">
            Stadium
          </vs-th>
          <vs-th
            sort
            @click="rows = $vs.sortData($event, rows, 'addressStreet')"
          >
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
            {{ tr.stadiumName }}
          </vs-td>
          <vs-td>
            {{ tr.addressStreet }}
          </vs-td>
          <vs-td>
            {{ tr.crimesCount }}
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>

    <span class="data">
      <pre>
  {{ selected ? selected : "Select an item in the table" }}
        </pre
      >
    </span>
  </div>
</template>

<script>
import LoadingSpinner from "./LoadingSpinner.vue";
import Filters from "./Filters.vue";
import { mapActions, mapState } from "vuex";
import { mapStadiumCrimeToTableRow } from "../utils/table";

export default {
  name: "StadiumCrimeTable",
  components: {
    LoadingSpinner,
    Filters,
  },
  methods: {
    ...mapActions(["updateLoading", "updateStadiumCrimes"]),
    beforeMount() {
      this.getStadiumCrimesByYearMonth("2021", "01");
    },
    getStadiumCrimesByYearMonth(year, month) {
      this.updateLoading(true);

      this.axios
        .get(
          `http://localhost:5722/api/stadium-crimes?year=${year}&month=${month}`
        )
        .then((response) => {
          this.updateStadiumCrimes(response.data);
          this.rows = this.stadiumCrimes.map((sc) =>
            mapStadiumCrimeToTableRow(sc)
          );
          this.updateLoading(false);
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
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  table {
    color: #fff;
  }
}
</style>
