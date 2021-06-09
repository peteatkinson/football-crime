interface ICompetition {
    id: number
    area: ICompetitionArea
    name: string
    code: string
    plan: string
    currentSeason: ICompetitionSeason
    seasons: ICompetitionSeason[]
    lastUpdated: string
}

interface ICompetitionSeason {
    id: number
    startDate: string
    endDate: string
    currentMatchDay: number
}

interface ICompetitionArea {
    id: number
    name: string
}