import fetch, { Response } from 'node-fetch'
import { URL } from 'url'

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

  protected async post (path: string, payload: any) {
    const url = new URL(path, this.baseUrl)
    console.log(url.toString())
    console.log(JSON.stringify(payload))

    const data = {
      postcodes: ['TS1 4JS']
    }

    return await fetch(url.toString(), {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
}
