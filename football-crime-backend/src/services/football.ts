import { FootballDataClient } from '@/integrations/football-data/client'

class FootballService {
  private static _instance?: FootballService

  private constructor () { }

  static get instance () {
    return this._instance || (this._instance = new this())
  }

  async getStadiums (season: string): Promise<any> {
    const result = await FootballDataClient.getCompetitionTeams(season)

    let stadiums = []

    /**
     * Maps the address field into street-postcode level data
     * @param address
     * @returns
     */
    const mapStadiumAddress = (address: string): any => {
      const splitIndex = address.lastIndexOf(' ', address.lastIndexOf(' ') - 1)
      return {
        street: address.substring(0, splitIndex).trim(),
        postcode: address.substring(splitIndex).trim()
      }
    }

    /**
    * Sort function to sort by venue name in alphabetical order
    * @param a
    * @param b
    * @returns
    */
    const sortbyName = (a: any, b: any): number => {
      const nameA = a.name.toUpperCase()
      const nameB = b.name.toUpperCase()
      return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0
    }

    if (result && result.teams.length > 0) {
      // map the teams result into stadium/venues with relationships to a specific team
      stadiums = result.teams.map((data) => {
        const address = mapStadiumAddress(data.address)

        return {
          name: data.venue,
          team: {
            id: data.id,
            name: data.name,
            shortName: data.shortName,
            founded: data.founded,
            crestUrl: data.crestUrl,
            tla: data.tla
          },
          address: {
            street: address.street,
            postcode: address.postcode
          }
        }
      })

      // sort stadiums in alphabetical order by venue name
      stadiums = stadiums.sort(sortbyName)
    }

    return stadiums
  }
}

const service = FootballService.instance
export { service as FootballService }
