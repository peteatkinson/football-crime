import { PostcodeResponse } from './types'
import { ApiClient } from '../api'

interface IPostcodesIOClient {
  bulkLookup: (postcodes: string[]) => Promise<PostcodeResponse>
}

class PostCodesIOClient extends ApiClient implements IPostcodesIOClient {
  private static _instance?: PostCodesIOClient

  private constructor () {
    super('https://api.postcodes.io')
  }

  static get instance () {
    return this._instance || (this._instance = new this())
  }

  async bulkLookup (postcodes: string[]): Promise<PostcodeResponse> {
    // call the lookup endpoint
    const response = await this.post('/postcodes/', {
      postcodes: postcodes
    })

    let bulkPostcodes: PostcodeResponse = null

    // if status code is 200 then parse the json
    if (response.ok) {
      const json = await response.text()

      bulkPostcodes = JSON.parse(json)
    }

    return bulkPostcodes
  }
}

const client = PostCodesIOClient.instance
export { client as PostCodesIOClient }
