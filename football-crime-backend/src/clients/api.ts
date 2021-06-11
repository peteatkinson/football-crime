import fetch, { Response } from 'node-fetch'
import { URL } from 'url'

export class ApiClient {
  protected baseUrl: string

  constructor (baseUrl: string) {
    this.baseUrl = baseUrl
  }

  /**
   * Performs a HTTP GET request
   * @param path
   * @param queryParams
   * @param headers
   * @returns
   */
  protected async get (path: string, queryParams?: { [key: string]: unknown }, headers?: { [key: string]: string }): Promise<Response> {
    const url = new URL(path, this.baseUrl)

    if (queryParams) {
      Object.keys(queryParams).forEach((key) => {
        const value = queryParams[key]
        url.searchParams.set(key, (value as any).toString())
      })
    }

    return await fetch(url.toString(), { method: 'GET', headers: headers })
  }

  /**
   * Perform a HTTP POST request
   * @param path
   * @param payload
   * @returns
   */
  protected async post (path: string, payload: any) {
    const url = new URL(path, this.baseUrl)

    return await fetch(url.toString(), {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
