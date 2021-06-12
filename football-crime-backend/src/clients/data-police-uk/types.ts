export interface ICrime {
  category: string
  location: ILocation
  context: string
  outcome_status: IOutcomeStatus
  month: string
}

export interface ILocation {
  latitude: string
  longitude: string
  street: IStreet
}

export interface IStreet {
  id: number
  name: string
}

export interface ICategory {
  code: string
  name: string
}

export interface IOutcomeStatus {
  category: string
  date: string
}
