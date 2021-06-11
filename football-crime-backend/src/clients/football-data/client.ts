import { ICompetitionMatches, ICompetitionTeams } from './types'
import { ApiClient } from '../api'

interface IFootballDataClient {
  getTeams: (season: string) => Promise<ICompetitionTeams>
  getMatches: (season: string) => Promise<ICompetitionMatches>
}

class FootballDataClient extends ApiClient implements IFootballDataClient {
  private static _instance?: FootballDataClient

  private readonly httpHeaders: { [key: string]: string }

  #apiKey: string

  private constructor () {
    super('https://api.football-data.org')
    this.httpHeaders = {
      'X-Auth-Token': '6a61eb72affa483780eabc39ef79391a'
    }
  }

  static get instance () {
    return this._instance || (this._instance = new this())
  }

  async getTeams (season: string): Promise<ICompetitionTeams> {
    const queryParams: { [key: string]: unknown } = {
      season: season
    }

    // call the lookup endpoint
    const response = await this.get('/v2/competitions/2021/teams', queryParams, this.httpHeaders)

    let teams: ICompetitionTeams = null

    // if status code is 200 then parse the json
    if (response.ok) {
      const json = await response.text()

      teams = JSON.parse(json)
    }

    return teams
  }

  async getMatches (season: string): Promise<ICompetitionMatches> {
    const queryParams: { [key: string]: unknown } = {
      season: season
    }

    const response = await this.get('/v2/competitions/2021/matches', queryParams, this.httpHeaders)

    let matches: ICompetitionMatches = null

    if (response.ok) {
      const json = await response.text()

      matches = JSON.parse(json)
    }

    return matches
  }
}

const client = FootballDataClient.instance
export { client as FootballDataClient }
