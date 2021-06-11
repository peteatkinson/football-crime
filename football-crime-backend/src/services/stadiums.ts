import { FootballDataClient } from '@/integrations/football-data/client'
import { PostCodesIOClient } from '@/integrations/postcodes-io/client'

import { InMemoryCache } from '@/cache'

import { Stadium, Address } from '@/models/football'

import { mapStadiumAddress, mapBulkPostCode } from '@/utils/football'

const getStadiumsBySeason = async (season: string): Promise<Stadium[]> => {
  const cache = InMemoryCache.get<Stadium[]>(`stadiums:season:${season}`)
  if (cache) {
    return cache
  }

  // lookup the teams
  const teams = await FootballDataClient.getTeams(season)

  let stadiums: Stadium[] = []

  // if we have any teams then
  if (teams && teams.teams.length > 0) {
    stadiums = teams.teams.map((team) => new Stadium(team.id, team.venue, mapStadiumAddress(team.address)))

    // perfrom a bulk lookup for additional address information on stadiums
    const addresses = await getAddressesByBulkPostcodes(stadiums.map((stadium) => stadium.address.postcode))

    // map stadiums with newly updated address data
    stadiums = stadiums.map((stadium) => {
      return {
        id: stadium.id,
        name: stadium.name,
        address: Object.assign(stadium.address, addresses.find((address) => address.postcode === stadium.address.postcode))
      }
    }) as Stadium[]

    // cache the resulting stadiums collection
    InMemoryCache.set(`stadiums:season:${season}`, stadiums)
  }

  return stadiums
}

const getAddressesByBulkPostcodes = async (bulkPostcodes: string[]): Promise<Address[]> => {
  const postcodes = await PostCodesIOClient.bulkLookup(bulkPostcodes)

  let addresses: Address[] = []

  if (postcodes && postcodes.result.length > 0) {
    addresses = postcodes.result.map((postcode) => mapBulkPostCode(postcode))
  }

  return addresses
}

export {
  getStadiumsBySeason
}
