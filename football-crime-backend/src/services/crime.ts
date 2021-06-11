import { DataPoliceClient } from '@/clients/data-police-uk/client'
import { Crimes, Crime } from '@/presentation/models/crime'

const getCrimesByLocation = async (lat: number, long: number, date: string): Promise<Crimes> => {
  // lookup the collection of crimes associated with lat/long and year/month
  const crimes = await DataPoliceClient.lookupByLongLat(date, long, lat)

  // create the base crimes object
  const result: Crimes = {
    lat: lat,
    long: long,
    crimes: []
  }

  // if there are any crimes
  if (crimes && crimes.length > 0) {
    // map the resulting crimes to a new model
    result.crimes = crimes.map((crime) => new Crime(crime.category))
  }

  return result
}

export {
  getCrimesByLocation
}
