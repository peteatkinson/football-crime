/**
 * Enviornment variables
 */
import dotenv from 'dotenv'
dotenv.config()

export default {
  port: process.env.PORT || 5722,
  footballDataApiKey: process.env.FOOTBALL_DATA_API_KEY || '',
}
