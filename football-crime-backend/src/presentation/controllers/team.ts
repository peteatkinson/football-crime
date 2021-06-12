import { Request, Response } from 'express'

import { getTeamById } from '@/services/team'

export const getTeamByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.query

  if (!id) {
    res.status(400).send('parameter: id  must be specified')
  }

  let response: any = null
  if (typeof id !== 'string') {
    if (isNaN(Number(id))) {
      res.status(400).send('parameter:id must be a numerical/string value')
    }
  } else {
    response = await getTeamById(parseInt(id))
  }

  res.status(200).send(JSON.stringify(response))
}
