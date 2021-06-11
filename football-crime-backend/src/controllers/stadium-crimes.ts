import { Request, Response } from 'express'

import { getStadiumCrimesByYearMonth } from '@/services/stadium-crimes'

export const getStadiumCrimesHandler = async (req: Request, res: Response) => {
  const { year, month } = req.query

  if (!year || !month) {
    res.status(400).send('parameter: year|month must be specified')
  }

  let response: any = null
  if (typeof year !== 'string' || typeof month !== 'string') {
    res.status(400).send('parameter: year|month must be a numerical/string value')
  } else {
    response = await getStadiumCrimesByYearMonth(year, month)
  }

  res.status(200).send(JSON.stringify(response))
}
