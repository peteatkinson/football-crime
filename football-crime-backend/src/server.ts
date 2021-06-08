import 'module-alias/register'

/**
 * Configuration imports
 */
import app from '@/config/app'
import env from '@/config/env'

/**
 * Startup 'HTTP' service
 */
app.listen(env.port, () => console.log(`🚀 Launch in 3...2..1! App up-and-running at: http://localhost:${env.port}`))
