export interface ICrime {
  category: ICategory
  location_type: 'Force' | 'BTP'
  location_subtype: string
  persistent_id: string
  month: string
  context: string
  outcome_status: IOutcomeStatus
}

export interface IOutcomeStatus {
  category: ICategory
  date: string
}

export interface ILocation {
  latitude: string
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
