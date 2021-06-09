import fetch, { Response } from 'node-fetch'

export class ApiClient {
  protected baseUrl: string

  constructor (baseUrl: string) {
    this.baseUrl = baseUrl
  }

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
}
