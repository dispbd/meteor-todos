import bodyParser from 'body-parser'
import { Accounts } from 'meteor/accounts-base'
import { check } from 'meteor/check'
import { Meteor } from 'meteor/meteor'
import { WebApp } from 'meteor/webapp'
import { User } from '../user/userSchema'

// Listen to incoming HTTP requests (can only be used on the server).
WebApp.handlers
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.text())
  .use(bodyParser.json())

WebApp.handlers.use(async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader?.includes('Basic ')) {
    const [, encodedAuth] = authHeader.split(' ')
    const decodedAuth = Buffer.from(encodedAuth, 'base64').toString()
    const [username, password] = decodedAuth.split(':')

    const user = await Meteor.users.findOneAsync({ username })
    check(user, Object)

    const { error } = await Accounts._checkPasswordAsync(
      user,
      password,
    )

    if (!error) {
      res.locals = {
        userIdAuth: (user as User)._id,
        roleAuth: (user as User).role,
      }
    } else {
      res.status(401).json({ error: 'Unauthorized' })
    }
  } else res.status(401).json({ error: 'Unauthorized' })

  // if (authHeader !== `Bearer ${req.query.authToken}`) {
  //   res.status(401).json({ error: 'Unauthorized' })
  // }

  next()
})
