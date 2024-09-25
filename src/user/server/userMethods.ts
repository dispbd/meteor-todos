import { Accounts } from 'meteor/accounts-base'
import { check } from 'meteor/check'
import { Mongo } from 'meteor/mongo'
import {
  checkCondition,
  validateEmail,
  validatePassword,
} from '/src/libs/helpers'
import { userAuthType } from '/src/types'
import { User, UsersCollection } from '../userSchema'

const accessError =
  'You do not have permission to perform this operation!'
const projection = {
  fields: { services: 0 },
}

export async function addUser(
  { userIdAuth, roleAuth }: userAuthType,
  { username, password, name, email, role }: User,
) {
  try {
    check(userIdAuth, String)
    check(roleAuth, String)
    if (role)
      checkCondition(
        role == 'admin' && roleAuth == 'admin',
        accessError,
      )

    check(username, String)
    validatePassword(password as string)

    if (email) validateEmail(email)
    if (name) check(name, String)

    const userId = await Accounts.createUserAsync({
      username,
      password,
      profile: { role, name, email },
    })
    const addedUser = await UsersCollection.findOneAsync(
      userId,
      projection,
    )
    checkCondition(addedUser, 'User not added!')

    return { ok: true, addedUser }
  } catch (error) {
    return { ok: false, error }
  }
}

export async function getUser(
  { userIdAuth, roleAuth }: userAuthType,
  userId: string,
) {
  try {
    check(userId, String)
    check(roleAuth, String)
    checkCondition(
      userIdAuth != userId && roleAuth == 'user',
      accessError,
    )

    const user = await UsersCollection.findOneAsync(
      userId,
      projection,
    )
    checkCondition(user, 'User not found!')

    return { ok: true, user }
  } catch (error) {
    return { ok: false, error }
  }
}

export async function getUsers(
  { userIdAuth: userId, roleAuth }: userAuthType,
  filters: object | undefined,
  options: object | undefined,
) {
  try {
    check(roleAuth, String)

    const isUserId = roleAuth == 'user' && { userId }
    const users = await UsersCollection.find(
      { ...filters, ...isUserId },
      {
        ...(options as Mongo.Options<object>),
        ...projection,
      },
    ).fetch()

    return { ok: true, users }
  } catch (error) {
    return { ok: false, error }
  }
}

export async function updateUser(
  { userIdAuth, roleAuth }: userAuthType,
  { _id: userId, username, password, name, email }: User,
) {
  try {
    check(userId, String)
    check(roleAuth, String)
    checkCondition(
      userIdAuth != userId && roleAuth == 'user',
      accessError,
    )

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
    return { ok: false, error }
  }
}

export async function removeUser(
  { roleAuth }: userAuthType,
  userId: string,
) {
  try {
    check(userId, String)
    checkCondition(roleAuth != 'admin', accessError)

    const user = await UsersCollection.findOneAsync(userId)
    checkCondition(user, 'User not found!')

    const result = await UsersCollection.removeAsync(userId)

    return { ok: true, isUserRemoved: Boolean(result) }
  } catch (error) {
    return { ok: false, error }
  }
}
