import { Accounts } from 'meteor/accounts-base'
import { check } from 'meteor/check'
import { Mongo } from 'meteor/mongo'
import {
  checkCondition,
  validateEmail,
  validatePassword,
} from '/src/libs/helpers'
import { User, UsersCollection } from '../userSchema'

const projection = {
  fields: { services: 0 },
}

export async function addUser({
  username,
  password,
  name,
  email,
}: User) {
  try {
    check(username, String)
    check(name, String)
    validatePassword(password as string)
    if (email) validateEmail(email)

    const isAdmin = false

    const userId = await Accounts.createUser({
      username,
      password,
      profile: {
        role: isAdmin ? 'admin' : 'user',
        name,
        email,
      },
    })
    const addedUser = await UsersCollection.findOneAsync(
      userId,
      projection,
    )
    checkCondition(addedUser, 'User not added!')

    return { ok: true, addedUser }
  } catch (error) {
    console.log('error: ', error)
    return { ok: false, error }
  }
}

export async function getUser(userId: string) {
  try {
    check(userId, String)

    const user = await UsersCollection.findOneAsync(
      userId,
      projection,
    )
    checkCondition(user, 'User not found!')

    return { ok: true, user }
  } catch (error) {
    console.log('error: ', error)
    return { ok: false, error }
  }
}

export async function getUsers(
  filters: object | undefined,
  options: object | undefined,
) {
  try {
    const users = await UsersCollection.find(filters || {}, {
      ...(options as Mongo.Options<object>),
      ...projection,
    }).fetch()

    return { ok: true, users }
  } catch (error) {
    console.log('error: ', error)
    return { ok: false, error }
  }
}

export async function updateUser({
  _id: userId,
  username,
  password,
  name,
  email,
}: User) {
  try {
    check(userId, String)

    const user = await UsersCollection.findOneAsync(userId)
    checkCondition(user, 'User not found!')

    if (password) {
      validatePassword(password as string)
      await Accounts.setPasswordAsync(userId, password)
    }

    if (name) check(name, String)
    if (username) check(username, String)
    if (email) validateEmail(email)

    const result = await UsersCollection.updateAsync(userId, {
      $set: {
        username: username || (user as User)?.username,
        email: email || (user as User)?.email,
        name: name || (user as User)?.name,
        updatedAt: new Date(),
      },
    })
    checkCondition(result, 'User not updated!')

    const updatedUser = await UsersCollection.findOneAsync(
      userId,
      projection,
    )

    return { ok: true, updatedUser }
  } catch (error) {
    console.log('error: ', error)
    return { ok: false, error }
  }
}

export async function removeUser(userId: string) {
  try {
    check(userId, String)

    const user = await UsersCollection.findOneAsync(userId)
    checkCondition(user, 'User not found!')

    const result = await UsersCollection.removeAsync(userId)

    return { ok: true, isUserRemoved: Boolean(result) }
  } catch (error) {
    console.log('error: ', error)
    return { ok: false, error }
  }
}
