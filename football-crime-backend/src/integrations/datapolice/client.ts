
import { ICrime } from './types'
import fetch, { Response } from 'node-fetch'

interface IDataPoliceClient {
  lookupByLocationId: (date: string, locationId: number) => Promise<ICrime[]>
  lookupByLongLat: (date: string, long: number, lat: number) => Promise<ICrime[]>
}

class DataPoliceClient implements IDataPoliceClient {
  private static _instance: IDataPoliceClient

  public baseUrl: string

  private constructor () {
    this.baseUrl = 'https://data.police.uk/api'
  }

  static get instance () {
    return this._instance || (this._instance = new this())
  }

  async lookupByLocationId (date: string, locationId: number): Promise<ICrime[]> {
    const queryParams: { [key: string]: unknown } = {
      date: date,
      location_id: locationId
    }

    const response = await fetch('/crimes-at-location', queryParams)
    let crimesResult: ICrime[] = null
    // if status code is 200 then parse the json
    if (response.ok) {
      const json = await response.text()

      crimesResult = JSON.parse(json)
    }

    // return the result
    return crimesResult
  }

  async lookupByLongLat (date: string, long: number, lat: number): Promise<ICrime[]> {
    const queryParams: { [key: string]: unknown } = {
      date: date,
      long: long,
      lat: lat
    }

    const response = await fetch('/crimes-at-location', queryParams)
    let crimesResult: ICrime[] = null

    // if status code is 200 then parse the json
    if (response.ok) {
      const json = await response.text()

      crimesResult = JSON.parse(json)
    }

    // return the result
    return crimesResult
  }

  async get (path: string, queryParams?: { [key: string]: unknown }): Promise<Response> {
    const url = new URL(path, this.baseUrl)

    if (queryParams) {
      Object.keys(queryParams).forEach((key) => {
        const value = queryParams[key]
        url.searchParams.set(key, (value as any).toString())
      })
    }

    return await fetch(url.toString())
  }
}

const client = DataPoliceClient.instance
export { client as DataPoliceClient }
