import { Stadium } from './football'

export class Crime {
  category?: string
  when?: string
  outcome?: string
  where?: string

  constructor (category: string, when: string, outcome: string, where: string) {
    this.category = category
    this.when = when
    this.outcome = outcome
    this.where = where
  }
}

export class Crimes {
  long: number
  lat: number
  crimes?: Crime[]
}

export class StadiumCrimes {
  stadium?: Stadium
  crimes: Crime[]

  constructor (stadium: Stadium) {
    this.stadium = stadium
  }
}
