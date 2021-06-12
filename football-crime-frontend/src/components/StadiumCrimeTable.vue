<template>
  <div class="stadium-crimes-table">
    <div v-if="loading" class="loading-spinner__mask">
      <LoadingSpinner />
    </div>

    <vs-table v-else striped v-model="selected">
      <template #header>
        <Filters v-on:filter="handleFilter" default-month="01" default-year="2021" />
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
export default {
  name: "StadiumCrimeTable",
  components: {
    LoadingSpinner,
    Filters,
  },
  methods: {
    beforeMount() {
      this.getStadiumCrimes('2021', '01')
    },
    handleFilter(year, month) {
      this.getStadiumCrimes(year, month);
    },
    getStadiumCrimes(year, month) {
      this.loading = true;

      this.axios
        .get(
          `http://localhost:5722/api/stadium-crimes?year=${year}&month=${month}`
        )
        .then((response) => {
          this.data = response.data;
          this.loading = false;
        });
    },
  },
  computed: {
    rows() {
      return this.data.map((sc) => {
        const { stadium, crimes } = sc
        return {
          id: stadium.id,
          stadiumName: stadium.name,
          addressStreet: stadium.address.street,
          crimesCount: crimes.length,
        };
      });
    },
  },
  data() {
    return {
      loading: false,
      selected: null,
      data: [],
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
