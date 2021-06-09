
import { ICrime } from './types'
import { ApiClient } from '../api'

interface IDataPoliceClient {
  lookupByLocationId: (date: string, locationId: number) => Promise<ICrime[]>
  lookupByLongLat: (date: string, long: number, lat: number) => Promise<ICrime[]>
}

class DataPoliceClient extends ApiClient implements IDataPoliceClient {
  private static _instance: IDataPoliceClient

  private constructor () {
    super('https://data.police.uk/api')
  }

  static get instance () {
    return this._instance || (this._instance = new this())
  }

  async lookupByLocationId (date: string, locationId: number): Promise<ICrime[]> {
    const queryParams: { [key: string]: unknown } = {
      date: date,
      location_id: locationId
    }

    const response = await this.get('/crimes-at-location', queryParams)
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

    const response = await this.get('/crimes-at-location', queryParams)
    let crimesResult: ICrime[] = null

    // if status code is 200 then parse the json
    if (response.ok) {
      const json = await response.text()

      crimesResult = JSON.parse(json)
    }

    // return the result
    return crimesResult
  }
}

const client = DataPoliceClient.instance
export { client as DataPoliceClient }
