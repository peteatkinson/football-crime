export class Stadium {
  id: number
  name: string
  address?: Address
  team?: Team
  constructor (id: number, name: string) {
    this.id = id
    this.name = name
  }
}

export class Team {
  id: number
  name: string
  shortName?: string
  founded?: number
  crestUrl?: string
  long?: number
  lat?: number
  squad?: TeamMember[]
}

export class TeamMember {
  name: string
  position?: string
  dateOfBirth?: string
  countryOfBirth?: string
  nationality?: string
  shirtNumber?: number
  role?: string

  constructor (name: string, position: string, dateOfBirth: string, countryOfBirth: string, nationality: string, shirtNumber: number, role: string) {
    this.name = name
    this.position = position
    this.dateOfBirth = dateOfBirth
    this.countryOfBirth = countryOfBirth
    this.nationality = nationality
    this.shirtNumber = shirtNumber
    this.role = role
  }
}

export class Address {
  street?: string
  postcode?: string
  country?: string
  region?: string
  constituency?: string
  district?: string
  parish?: string
  ward?: string
  long?: number
  lat?: number

  constructor (street: string, postcode: string) {
    this.street = street.trim()
    this.postcode = postcode.trim()
  }
}
