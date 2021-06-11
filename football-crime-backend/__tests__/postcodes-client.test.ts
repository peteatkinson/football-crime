import { PostCodesIOClient } from '../src/integrations/postcodes-io/client'

describe('postcodes client test suite', () => {
  it('should bulk lookup postcodes', async () => {
    const lookups = [
      'WC2B 4HN',
      'LS11 5WD',
      'EC1N 8HN',
      'WC2E8QH'
    ]

    const response = await PostCodesIOClient.bulkLookup(lookups)

    expect(response.status).toBe(200)
    expect(response.result.length).toBe(4)
  })
})
