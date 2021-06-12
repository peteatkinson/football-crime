import { getCrimesByLocation } from '@/services/crime'
import { getStadiumsBySeason } from '@/services/stadiums'

import { InMemoryCache } from '@/utils/cache'
import { Crimes, StadiumCrimes } from '@/presentation/models/crime'


/**
 * Retrieves a list of stadium crimes filtered by year/month
 * @param year in format XXXX
 * @param month in format XX
 * @returns StadiumCrimes - a collection of stadium crimes
 */
const getStadiumCrimesByYearMonth = async (year: string, month: string): Promise<StadiumCrimes[]> => {
  const date = `${year}-${month}`

  const cacheKey: string = `stadium-crimes:${date}`

  // check to see if there is any Stadium crimes available in the cache
  const cache = InMemoryCache.get<StadiumCrimes[]>(cacheKey)

  // if so, return the cached version
  if (cache != null) {
    return cache
  }

  // find all stadiums by the season/year
  const stadiums = await getStadiumsBySeason(year)

  // create the base stadium crimes collection
  let stadiumCrimes: StadiumCrimes[] = stadiums.map((stadium) => {
    return new StadiumCrimes(stadium)
  })

  const promises = [] as Array<Promise<Crimes>>

  // foreach stadium allocate a promise to get crimes by location (long/lat), to be resolved later
  for (const stadium of stadiums) {
    const { long, lat } = stadium.address
    const promise = getCrimesByLocation(lat, long, date).then((result) => result).catch(() => null)
    promises.push(promise)
  }

  // resolve all promises
  const crimes = await Promise.all(promises)
  // if there are any crimes
  if (crimes && crimes.length > 0) {
    // plug in each collection of crimes
    stadiumCrimes = stadiumCrimes.map((sc) => {
      // lookup the collection of crimes by matching on lat/long
      const match = crimes.find((c) => c.lat === sc.stadium.address.lat && c.long === sc.stadium.address.long)
      sc.crimes = match ? match.crimes : []
      return sc
    })

    // cache the stadium crimes collection
    InMemoryCache.set(cacheKey, stadiumCrimes)
  }

  return stadiumCrimes
}

export {
  getStadiumCrimesByYearMonth
}
