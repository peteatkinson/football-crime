import { ICompetitionMatches, ICompetitionTeams } from './types'
import { ApiClient } from '../api'

import { InMemoryCache } from '@/cache'

interface IFootballDataClient {
  getTeams: (season: string) => Promise<ICompetitionTeams>
  getMatches: (seaso: string) => Promise<ICompetitionMatches>
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

    const cache = InMemoryCache.get<ICompetitionTeams>(`competition-teams:season${season}`)

    if (cache) {
      return cache
    }

    // call the lookup endpoint
    const response = await this.get('/v2/competitions/2021/teams', queryParams, this.httpHeaders)

    let teams: ICompetitionTeams = null

    // if status code is 200 then parse the json
    if (response.ok) {
      const json = await response.text()

      teams = JSON.parse(json)

      if (json !== '') {
        // if we dont have an empty response
        InMemoryCache.set(`competition-teams:season${season}`, teams)
      }
    }

    return teams
  }

  async getMatches (season: string): Promise<ICompetitionMatches> {
    const queryParams: { [key: string]: unknown } = {
      season: season
    }

    const cache = InMemoryCache.get<ICompetitionMatches>(`competition-teams:matches${season}`)

    if (cache) {
      console.log('getting fro cache')
      return cache
    }

    const response = await this.get('/v2/competitions/2021/matches', queryParams, this.httpHeaders)

    let matches: ICompetitionMatches = null

    if (response.ok) {
      const json = await response.text()

      matches = JSON.parse(json)

      if (json !== '') {
        console.log('caching response')
        // if we dont have an empty response
        InMemoryCache.set(`competition-teams:matches${season}`, matches)
      }
    }

    return matches
  }
}

const client = FootballDataClient.instance
export { client as FootballDataClient }
