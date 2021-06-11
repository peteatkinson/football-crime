import { FootballDataClient } from '@/clients/football-data/client'
import { getAddressesByPostcodes } from '@/services/address'

import { Stadium, Address } from '@/presentation/models/football'

/**
 * Retrieves stadium information filtered by season
 * @param season - string value 2017-2021
 * @returns an array of Stadiums
 */
const getStadiumsBySeason = async (season: string): Promise<Stadium[]> => {
  // loookup the football teams by season/year
  const teams = await FootballDataClient.getTeams(season)

  let stadiums: Stadium[] = []

  // if we have any teams in the collection then
  if (teams && teams.teams.length > 0) {
    // map each team into stadiums (id, venue, postcode and street)
    stadiums = teams.teams.map((team) => {
      const { id, venue, address } = team

      const stadium = new Stadium(id, venue)

      // split on the 2nd last space to extract the postcode
      // for example: The Walkers Stadium, Filbert Way Leicester LE2 7FL
      // the left-most of the space maps to the street and the right-most part maps to the postcode
      const index = address.lastIndexOf(' ', address.lastIndexOf(' ') - 1)
      const postcode = address.substring(index)
      const street = address.substring(0, index)

      stadium.address = new Address(street, postcode)
      return stadium
    })

    // perform a bulk lookup on the postcodes to get additional location information about the stadium
    const addresses = await getAddressesByPostcodes(stadiums.map((stadium) => stadium.address.postcode))

    // plugin in each location into the stadiums collection
    stadiums = stadiums.map((s) => {
      s.address = Object.assign(s.address, addresses.find((address) => address.postcode === s.address.postcode))
      return s
    })
  }

  return stadiums
}

export {
  getStadiumsBySeason
}
