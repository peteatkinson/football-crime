export class ApiClient {
  constructor($axios) {
      console.log($axios)

    this.$axios = $axios;
    this.baseUrl = "http://localhost:5722/api";
  }

  getStadiumCrimes(year, month) {
    return this.$axios.get(`${this.baseUrl}/stadium-crimes?year=${year}&month=${month}`);
  }

  getTeam(id) {
    return this.$axios.get(`${this.baseUrl}/team?id=${id}`);
  }
}

