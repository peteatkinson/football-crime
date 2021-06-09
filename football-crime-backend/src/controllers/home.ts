import { Request, Response } from 'express'

import { FootballDataClient } from '@/integrations/football-data/client'

export const index = async (req: Request, res: Response) => {
  const result = await FootballDataClient.getCompetitionTeams('2020')

  res.status(200).send(JSON.stringify(result))
}
