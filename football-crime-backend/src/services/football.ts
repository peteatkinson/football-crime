import { FootballDataClient } from '@/integrations/football-data/client'
import { PostCodesIOClient } from '@/integrations/postcodes-io/client'

const getStadiumsBySeason = async (season: string): Promise<any> => {
  const result = await FootballDataClient.getTeams(season)

  if (result && result.teams.length > 0) {
    // map the teams result into stadium/venues with relationships to a specific team
    // get all the postcodes to lookup
    const postcodes = result.teams.map((team) => {
      const teamAddress = team.address
      const index = teamAddress.lastIndexOf(' ', teamAddress.lastIndexOf(' ') - 1)
      const postcode = teamAddress.substring(index).trim()
      return postcode
    })

    const bulkPostcodes = await PostCodesIOClient.bulkLookup(postcodes)
    console.log(bulkPostcodes)
  }

  return []
}

const getHomeMatchesByTeam = async (season: string, team: number) => {
  const data = await FootballDataClient.getMatches(season)

  const homeMatches = []

  if (data && data.count > 0) {
    homeMatches.push(data.matches.filter((match) => match.homeTeam.id === team))
  }

  return homeMatches
}

export {
  getStadiumsBySeason,
  getHomeMatchesByTeam
}
