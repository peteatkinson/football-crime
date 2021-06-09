import { ICompetitionTeams } from './types'
import { ApiClient } from '../api'

interface IFootballDataClient {
  getCompetitionTeams: (season: string) => Promise<ICompetitionTeams>
}

class FootballDataClient extends ApiClient implements IFootballDataClient {
  private static _instance?: FootballDataClient

  private readonly httpHeaders: { [key: string]: string }

  #apiKey: string

  private constructor () {
    super('https://api.football-data.org')
    this.httpHeaders = {
      'X-Auth-Token': '8d3f09c563e74fe3a430ff6b931babbd'
    }
  }

  static get instance () {
    return this._instance || (this._instance = new this())
  }

  async getCompetitionTeams (season: string): Promise<ICompetitionTeams> {
    const queryParams: { [key: string]: unknown } = {
      season: season
    }

    // call the lookup endpoint
    const response = await this.get('/v2/competitions/2021/teams', queryParams, this.httpHeaders)

    let teamsResult: ICompetitionTeams = null

    // if status code is 200 then parse the json
    if (response.ok) {
      const json = await response.text()

      teamsResult = JSON.parse(json)
    }
    console.log(teamsResult)
    // return the result
    return teamsResult
  }
}

const client = FootballDataClient.instance
export { client as FootballDataClient }
