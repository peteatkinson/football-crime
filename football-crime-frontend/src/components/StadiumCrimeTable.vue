<template>
  <div class="stadium-crimes-table">
    <vs-table v-model="selected">
      <template #header>
        <div class="stadium-crimes-table__filters">
          <span>Filters: </span>
          <vs-select @change="handleSelectYear" placeholder="Year" v-model="yearSelected">
            <vs-option :key="`filter:year:${year}index:${index}`" v-for="(year, index) in filters.years" :label="year.text" :value="year.value">
              {{ year.text }}
            </vs-option>
          </vs-select>

          <vs-select @change="handleSelectMonth" placeholder="Month" v-model="monthSelected">
            <vs-option :key="`filter:month:${month}index:${index}`" v-for="(month, index) in filters.months" :label="month.text" :value="month.value">
              {{ month.text }}
            </vs-option>
          </vs-select>
        </div>
      </template>
      <template #thead>
        <vs-tr>
          <vs-th>
            Name
          </vs-th>
          <vs-th>
            Email
          </vs-th>
          <vs-th>
            Id
          </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
          :key="i"
          v-for="(tr, i) in users"
          :data="tr"
          :is-selected="selected == tr"
        >
          <vs-td>
            {{ tr.name }}
          </vs-td>
          <vs-td>
            {{ tr.email }}
          </vs-td>
          <vs-td>
            {{ tr.id }}
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
export default {
  name: "StadiumCrimeTable",
  beforeMount() {
    this.filters.years = [
      { value: 2017, text: "2017" },
      { value: 2018, text: "2018" },
      { value: 2019, text: "2019" },
      { value: 2020, text: "2020" },
      { value: 2021, text: "2021" },
    ];

    this.yearSelected = parseInt(new Date().getFullYear())
    this.monthSelected = 1
    const monthsMap = {
      1: "Jan",
      2: "Feb",
      3: "Mar",
      4: "Apr",
      5: "May",
      6: "Jun",
      7: "Jul",
      8: "Aug",
      9: "Sept",
      10: "Oct",
      11: "Nov",
      12: "Dec",
    };

    var months = monthsMap;

    this.filters.months = Object.keys(months).map((value, index) => {
      const valueNum = index + 1;
      return {
        value: valueNum,
        text: monthsMap[valueNum]
      };
    });
  },
  methods: {
      handleSelectYear(value) {
          console.log('handle select year')
      },
      handleSelectMonth(year) {
          console.log('handle month selected')
      }
  },
  data() {
    return {
      filters: {
        years: [],
        months: [],
      },
      yearSelected: null,
      monthSelected: null,
      selected: null,
      users: [
        {
          id: 1,
          name: "Leanne Graham",
          username: "Bret",
          email: "Sincere@april.biz",
          website: "hildegard.org",
        },
        {
          id: 2,
          name: "Ervin Howell",
          username: "Antonette",
          email: "Shanna@melissa.tv",
          website: "anastasia.net",
        },
        {
          id: 3,
          name: "Clementine Bauch",
          username: "Samantha",
          email: "Nathan@yesenia.net",
          website: "ramiro.info",
        },
        {
          id: 4,
          name: "Patricia Lebsack",
          username: "Karianne",
          email: "Julianne.OConner@kory.org",
          website: "kale.biz",
        },
        {
          id: 5,
          name: "Chelsey Dietrich",
          username: "Kamren",
          email: "Lucio_Hettinger@annie.ca",
          website: "demarco.info",
        },
        {
          id: 6,
          name: "Mrs. Dennis Schulist",
          username: "Leopoldo_Corkery",
          email: "Karley_Dach@jasper.info",
          website: "ola.org",
        },
        {
          id: 7,
          name: "Kurtis Weissnat",
          username: "Elwyn.Skiles",
          email: "Telly.Hoeger@billy.biz",
          website: "elvis.io",
        },
        {
          id: 8,
          name: "Nicholas Runolfsdottir V",
          username: "Maxime_Nienow",
          email: "Sherwood@rosamond.me",
          website: "jacynthe.com",
        },
        {
          id: 9,
          name: "Glenna Reichert",
          username: "Delphine",
          email: "Chaim_McDermott@dana.io",
          website: "conrad.com",
        },
        {
          id: 10,
          name: "Clementina DuBuque",
          username: "Moriah.Stanton",
          email: "Rey.Padberg@karina.biz",
          website: "ambrose.net",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.stadium-crime-table {
    &__filters {
        display: flex;
        flex-direction: column;
    }
}

::v-deep .stadium-crimes-table__filters {
    display: flex;

    span {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 16px;
    }
}
</style>