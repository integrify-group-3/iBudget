import errorHandler from 'errorhandler'
import express from 'express'

import app from './app'

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  )
  console.log('  Press CTRL-C to stop\n')
})

export default server
