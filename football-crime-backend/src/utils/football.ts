import { BulkPostcode } from '@/integrations/postcodes-io/types'

import { Address } from '@/models/football'

export const mapStadiumAddress = (venue: string): Address => {
  const index = venue.lastIndexOf(' ', venue.lastIndexOf(' ') - 1)
  const postcode = venue.substring(index).trim()
  const street = venue.substring(0, index).trim()
  return new Address(street, postcode)
}

export const mapBulkPostCode = (postcode: BulkPostcode): Address => {
  const value = postcode.result
  const address: Address = {
    constituency: value.parliamentary_constituency,
    country: value.country,
    district: value.admin_district,
    parish: value.parish,
    postcode: value.postcode,
    region: value.region,
    ward: value.admin_ward,
    long: value.longitude,
    lat: value.latitude
  }
  return address
}
