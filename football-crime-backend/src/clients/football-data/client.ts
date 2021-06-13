import { ICompetitionMatches, ICompetitionTeams, ITeam } from './types'
import { ApiClient } from '../api'
import env from '@/config/env'

interface IFootballDataClient {
  getTeams: (season: string) => Promise<ICompetitionTeams>
  getMatches: (season: string) => Promise<ICompetitionMatches>
  getTeam: (id: number) => Promise<ITeam>
}

class FootballDataClient extends ApiClient implements IFootballDataClient {
  private static _instance?: FootballDataClient

  private readonly httpHeaders: { [key: string]: string }

  private constructor () {
    super('https://api.football-data.org')
    this.httpHeaders = {
      'X-Auth-Token': env.footballDataApiKey
    }
  }

  static get instance () {
    return this._instance || (this._instance = new this())
  }

  async getTeam (id: number): Promise<ITeam> {
    const response = await this.get(`/v2/teams/${id}/`, {}, this.httpHeaders)

    let team: ITeam = null

    if (response.ok) {
      const json = await response.text()

      team = JSON.parse(json)
    }

    return team
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
