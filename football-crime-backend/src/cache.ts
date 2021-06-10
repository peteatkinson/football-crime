
import NodeCache from 'node-cache'

class InMemoryCache {
  private static _instance?: InMemoryCache

  private readonly cache: NodeCache

  private constructor () {
    this.cache = new NodeCache({
      stdTTL: 3600, // 1 hour
      checkperiod: 120 // 2 minutes
    })
  }

  static get instance () {
    return this._instance || (this._instance = new this())
  }

  set <T> (key: string, value: T) {
    this.cache.set(key, value)
  }

  get <T> (key: string): T {
    return this.cache.get(key)
  }
}

const cache = InMemoryCache.instance
export { cache as InMemoryCache }
