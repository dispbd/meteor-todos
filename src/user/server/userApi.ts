import bodyParser from 'body-parser'
import { WebApp } from 'meteor/webapp'
import { parseQuery } from '/src/libs'
import { logger } from '/src/libs/server'
import { queryFilter } from '../../types'
import { User } from '../userSchema'
import {
  addUser,
  getUser,
  getUsers,
  removeUser,
  updateUser,
} from './userMethods'

// Listen to incoming HTTP requests (can only be used on the server).
WebApp.handlers
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.text())
  .use(bodyParser.json())

// WebApp.handlers.use((req, res, next) => {
//   const authHeader = req.headers.authorization

//   if (authHeader !== `Bearer ${req.query.authToken}`) {
//     res.status(401).json({ error: 'Unauthorized' })
//   }

//   next()
// })

WebApp.handlers.post('/users/add', async (req, res) => {
  try {
    const result = await addUser(req.body)

    if (result.ok) {
      res.status(200).json(result.addedUser)
    } else {
      logger.error(result.error, res)
    }
  } catch (error) {
    logger.error(error, res)
  }
})

WebApp.handlers.get('/users/:userId', async (req, res) => {
  try {
    const result = await getUser(req.body.userId)

    if (result.ok) {
      res.status(200).json(result.user)
    } else {
      logger.error(result.error, res)
    }
  } catch (error) {
    logger.error(error, res)
  }
})

WebApp.handlers.get('/users', async (req, res) => {
  try {
    const { filters, options } = parseQuery(req.query as queryFilter)

    const result = await getUsers(filters, options)

    if (result.ok) {
      res.status(200).json(result.users)
    } else {
      logger.error(result.error, res)
    }
  } catch (error) {
    logger.error(error, res)
  }
})

WebApp.handlers.put('/users/update', async (req, res) => {
  try {
    if (req.query?.id) {
      req.body._id = req.query.id
    }

    const result = await updateUser(req.body as User)

    if (result.ok) {
      res.status(200).json(result.updatedUser)
    } else {
      logger.error(result.error, res)
    }
  } catch (error) {
    logger.error(error, res)
  }
})

WebApp.handlers.delete('/users/remove/:userId', async (req, res) => {
  try {
    const result = await removeUser(req.params.userId)

    if (result.ok) {
      res.status(200).json(result)
    } else {
      logger.error(result.error, res)
    }
  } catch (error) {
    logger.error(error, res)
  }
})
