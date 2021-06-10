import { Request, Response } from 'express'

import { FootballService } from '@/services/football'

export const index = async (req: Request, res: Response) => {
  const result = await FootballService.getStadiums('2020')

  res.status(200).send(JSON.stringify(result))
}
