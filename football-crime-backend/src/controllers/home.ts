import { Request, Response } from 'express'

import { getStadiumsBySeason } from '@/services/football'

export const index = async (req: Request, res: Response) => {
  const result = await getStadiumsBySeason('2020')

  res.status(200).send(JSON.stringify(result))
}
