import bodyParser from 'body-parser'
import { WebApp } from 'meteor/webapp'
import multer from 'multer'
import { parseQuery } from '/src/libs'
import { logger } from '/src/libs/server'
import { queryFilter, userAuthType } from '../../types'
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

const upload = multer({})

WebApp.handlers.post(
  '/users/addAvatar',
  upload.single('avatar'),
  function (req, res, next) {
    // req.file is the `avatar` file
    console.log('req.file: ', req.file)
    // req.body will hold the text fields, if there were any
  },
)

WebApp.handlers.post('/users/add', async (req, res) => {
  try {
    const userAuth = res.locals as userAuthType

    const result = await addUser(userAuth, req.body)

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
    const userAuth = res.locals as userAuthType

    const result = await getUser(userAuth, req.body.userId)

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
    const userAuth = res.locals as userAuthType

    const { filters, options } = parseQuery(req.query as queryFilter)

    const result = await getUsers(userAuth, filters, options)

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
    const userAuth = res.locals as userAuthType
    if (req.query?.id) {
      req.body._id = req.query.id
    }

    const result = await updateUser(userAuth, req.body as User)

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
    const userAuth = res.locals as userAuthType

    const result = await removeUser(userAuth, req.params.userId)

    if (result.ok) {
      res.status(200).json(result)
    } else {
      logger.error(result.error, res)
    }
  } catch (error) {
    logger.error(error, res)
  }
})
