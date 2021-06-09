import { ICompetitionTeams } from './types'

import fetch, { Response } from 'node-fetch'

interface IFootballDataClient {
  getCompetitionTeams: (season: string) => Promise<ICompetitionTeams>
}

class FootballDataClient implements IFootballDataClient {
  private static _instance?: FootballDataClient

  public baseUrl: string

  private readonly competitionId: string = '2021'
  private readonly httpHeaders: { [key: string]: string }

  #apiKey: string

  private constructor () {
    this.baseUrl = 'https://api.football-data.org'
    this.#apiKey = '8d3f09c563e74fe3a430ff6b931babbd'
    this.httpHeaders = {
      'X-Auth-Token': this.#apiKey,
      'Content-Type': 'application/json'
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
    const response = await this.get(`/v2/competitions/${this.competitionId}/teams`, queryParams)

    let competitionTeams: ICompetitionTeams = null

    // if status code is 200 then parse the json
    if (response.ok) {
      const json = await response.text()

      competitionTeams = JSON.parse(json)
    }
    console.log(competitionTeams)
    // return the result
    return competitionTeams
  }

  async get (path: string, queryParams?: { [key: string]: unknown }): Promise<Response> {
    const url = new URL(path, this.baseUrl)

    if (queryParams) {
      Object.keys(queryParams).forEach((key) => {
        const value = queryParams[key]
        url.searchParams.set(key, (value as any).toString())
      })
    }

    return await fetch(url.toString(), { method: 'GET', headers: this.httpHeaders })
  }
}

const client = FootballDataClient.instance
export { client as FootballDataClient }
