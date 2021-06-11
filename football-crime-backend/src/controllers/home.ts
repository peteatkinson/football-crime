import { Request, Response } from 'express'

import { getStadiumsBySeason } from '@/services/stadiums'

export const index = async (req: Request, res: Response) => {
  const season = req.query.season

  if (!season) {
    res.status(400).send('parameter: season must be specified')
  }

  if (typeof season !== 'string') {
    res.status(400).send('parameter: season must be a numerical/string value')
  }

  const result = await getStadiumsBySeason(season as string)

  res.status(200).send(JSON.stringify(result))
}
