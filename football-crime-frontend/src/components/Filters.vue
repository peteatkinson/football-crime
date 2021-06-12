<template>
  <div class="filters">
    <span class="filters__text filters__text-filter">Filters: </span>
    <vs-select
      placeholder="Year"
      @change="handleSelectYear"
      v-model="yearSelected"
    >
      <vs-option
        :key="`filter:year:${year}index:${index}`"
        v-for="(year, index) in yearFilters"
        :label="year.text"
        :value="year.value"
      >
        {{ year.text }}
      </vs-option>
    </vs-select>

    <vs-select
      placeholder="Month"
      @change="handleSelectMonth"
      v-model="monthSelected"
    >
      <vs-option
        :key="`filter:year:${month}index:${index}`"
        v-for="(month, index) in monthFilters"
        :label="month.text"
        :value="month.value"
      >
        {{ month.text }}
      </vs-option>
    </vs-select>

    <!-- <span class="filters__text filters__text-showing">{{
      showingFiltersText
    }}</span> -->
  </div>
</template>

<script>
export default {
  name: "Filters",
  props: {
    defaultMonth: String,
    defaultYear: String,
    rows: Number,
  },
  data() {
    return {
      yearSelected: "",
      monthSelected: "",
      yearFilters: [
        { value: 2017, text: "2017" },
        { value: 2018, text: "2018" },
        { value: 2019, text: "2019" },
        { value: 2020, text: "2020" },
        { value: 2021, text: "2021" },
      ],
      monthFilters: [
        { value: "01", text: "Jan" },
        { value: "02", text: "Feb" },
        { value: "03", text: "Mar" },
        { value: "04", text: "Apr" },
        { value: "05", text: "May" },
        { value: "06", text: "Jun" },
        { value: "07", text: "Jul" },
        { value: "08", text: "Aug" },
        { value: "09", text: "Sept" },
        { value: "10", text: "Oct" },
        { value: "11", text: "Nov" },
        { value: "12", text: "Dec" },
      ],
    };
  },
  beforeMount() {
    this.yearSelected = this.defaultYear;
    this.monthSelected = this.defaultMonth;
  },
  methods: {
    handleSelectYear(year) {
      console.log('handle year selected', year)
      console.log('handle year selected', year)
      this.yearSelected = year;
      console.log("yearSelected", this.yearSelected)
      this.$emit("filter", this.yearSelected, this.monthSelected);
    },
    handleSelectMonth(month) {
      console.log('handle year selected', month)
      this.monthSelected = `${month}`;
      console.log("monthSelected", this.monthSelected)

      this.$emit("filter", this.yearSelected, this.monthSelected);
    },
  },
};
</script>

<style lang="scss" scoped>
.filters {
  color: #fff;
  display: flex;
  flex-direction: row;
  color: #fff;
}
::v-deep {
  .filters__text {
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    &-showing {
      margin-left: 16px;
    }
    &-filters {
      margin-right: 16px;
    }
  }
}
</style>
