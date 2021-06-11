export interface ICrime {
  category: string
  location: ILocation
}

export interface ILocation {
  latitude: string
  longitude: string
}

export interface IStreet {
  id: number
  name: string
}

export interface ICategory {
  code: string
  name: string
}
