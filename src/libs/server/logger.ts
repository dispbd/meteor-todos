// eslint-disable-next-line import/no-unresolved
import { Response } from 'express'
import log4js from 'log4js'
import { Meteor } from 'meteor/meteor'

type MeteorPath = {
  rootPath: string
}

class Logger {
  shortName: string
  infoLogger
  errorLogger

  constructor(shortName = '') {
    this.shortName = shortName

    let filenameInfo = 'src/logs/app.log'
    let filenameError = 'src/logs/app.log'
    if (Meteor.isDevelopment) {
      const { rootPath } = Meteor as unknown as MeteorPath
      const [devPath] = rootPath.split('.meteor')

      filenameInfo = `${devPath}logs/info.log`
      filenameError = `${devPath}logs/error.log`
    }

    log4js.configure({
      appenders: {
        console: { type: 'console' },
        info: { type: 'file', filename: filenameInfo },
        error: { type: 'file', filename: filenameError },
      },
      categories: {
        default: { appenders: ['console'], level: 'info' },
        info: { appenders: ['info'], level: 'info' },
        error: { appenders: ['error'], level: 'error' },
      },
    })

    this.infoLogger = log4js.getLogger('info')
    this.errorLogger = log4js.getLogger('error')
  }

  log(title = '', description: string | unknown = '') {
    const colon = description ? ':' : ''
    console.log(`[${this.shortName}] ${title}${colon}`, description)

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    description && this.infoLogger.log(description as string)
  }

  error(error: Error | unknown, responseError?: Response) {
    console.error(error)

    if (responseError) {
      try {
        responseError.status(500).send({
          status: 500,
          message: (error as Error).message,
        })
      } catch (errorReponse) {
        this.errorLogger.error(errorReponse)
      }
    }

    this.errorLogger.error(error)
  }
}

export const logger = new Logger()
