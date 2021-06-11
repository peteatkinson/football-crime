import { Stadium } from './football'

export class Crime {
  category?: string
  constructor (category: string) {
    this.category = category
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
