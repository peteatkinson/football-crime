import { FootballDataClient } from '@/clients/football-data/client'
import { Team, TeamMember } from '@/presentation/models/football'
import { InMemoryCache } from '@/utils/cache'

const getTeamById = async (id: number): Promise<Team> => {
  const cacheKey: string = `teams:${id}`
  const cache = InMemoryCache.get<Team>(cacheKey)

  if (cache != null) {
    return cache
  }

  const data = await FootballDataClient.getTeam(id)

  let team: Team = null
  if (data !== null) {
    team = new Team()
    team.squad = data.squad.map((member) => {
      return new TeamMember(
        member.name,
        member.position,
        member.dateOfBirth,
        member.countryOfBirth,
        member.nationality,
        member.shirtNumber,
        member.role
      )
    })

    InMemoryCache.set(cacheKey, team)
  }

  return team
}

export {
  getTeamById
}
