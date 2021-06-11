import { Address } from '@/presentation/models/football'
import { PostCodesIOClient } from '@/clients/postcodes-io/client'

const getAddressesByPostcodes = async (postcodes: string[]): Promise<Address[]> => {
  // perform a bulk lookup for a collection of postcodes
  const response = await PostCodesIOClient.bulkLookup(postcodes)

  let addresses: Address[] = []

  // if we have a response from the client
  if (response && response.result.length > 0) {
    // map each postcode result into an address object
    addresses = response.result.map((postcode) => {
      const { result } = postcode
      const address: Address = {
        constituency: result.parliamentary_constituency,
        country: result.country,
        district: result.admin_district,
        parish: result.parish,
        postcode: result.postcode,
        region: result.region,
        ward: result.admin_ward,
        long: result.longitude,
        lat: result.latitude
      }
      return address
    })
  }

  return addresses
}

export {
  getAddressesByPostcodes
}
