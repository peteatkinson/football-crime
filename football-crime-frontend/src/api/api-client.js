export class ApiClient {
  constructor($axios, baseUrl) {
    this.$axios = $axios;
    this.baseUrl = baseUrl;
  }

  getStadiumCrimes(year, month) {
    return this.$axios.get(`${this.baseUrl}/stadium-crimes?year=${year}&month=${month}`);
  }

  getTeam(id) {
    return this.$axios.get(`${this.baseUrl}/team?id=${id}`);
  }
}

