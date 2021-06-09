import { PostcodeResponse, IPostcode } from './types'
import fetch, { Response } from 'node-fetch'

interface IPostcodesIOClient {
  lookup: (postcode: string) => Promise<PostcodeResponse<IPostcode>>
  validate: (postcode: string) => Promise<PostcodeResponse<boolean>>
  search: (postcode: string) => Promise<PostcodeResponse<string[]>>
}

class PostCodesIOClient implements IPostcodesIOClient {
  private static _instance?: PostCodesIOClient

  public baseUrl: string

  private constructor () {
    this.baseUrl = 'https://api.postcodes.io'
  }

  static get instance () {
    return this._instance || (this._instance = new this())
  }

  async search (postcode: string): Promise<PostcodeResponse<string[]>> {
    // call the autocomplete endpoint
    const response = await this.get(`/postcodes/${postcode}/autocomplete`)

    let searchResult: PostcodeResponse<string[]> = null

    // if status code is 200
    if (response.ok) {
      // parse the JSON
      const json = await response.text()

      searchResult = JSON.parse(json)
    }

    // return the result
    return searchResult
  }

  async validate (postcode: string): Promise<PostcodeResponse<boolean>> {
    // call the validate endpoint
    const response = await this.get(`/postcodes/${postcode}/validate`)

    let validateResult: PostcodeResponse<boolean> = null
    // if status 200 then parse the json
    if (response.ok) {
      const json = await response.text()

      validateResult = JSON.parse(json)
    }

    // return the result
    return validateResult
  }

  async lookup (postcode: string): Promise<PostcodeResponse<IPostcode>> {
    // call the lookup endpoint
    const response = await this.get(`/postcodes/${postcode}`)

    let lookupResult: PostcodeResponse<IPostcode> = null

    // if status code is 200 then parse the json
    if (response.ok) {
      const json = await response.text()

      lookupResult = JSON.parse(json)
    }

    // return the result
    return lookupResult
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

const client = PostCodesIOClient.instance
export { client as PostCodesIOClient }
