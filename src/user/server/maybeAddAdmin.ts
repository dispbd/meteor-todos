import { Accounts } from 'meteor/accounts-base'
import { logger } from '/src/libs/server'
import { UsersCollection } from '../userSchema'

Accounts.onCreateUser((options, user) => {
  const customizedUser = {
    ...user,
    ...options,
    ...options.profile,
  }

  return customizedUser
})

export async function maybeAddAdmin() {
  try {
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'a'
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'a'

    const user = await UsersCollection.findOneAsync({ role: 'admin' })
    if (!user) {
      await Accounts.createUser({
        username: ADMIN_USERNAME,
        password: ADMIN_PASSWORD,
        profile: {
          role: 'admin',
          name: 'Main Admin',
        },
      })
    }
  } catch (error) {
    logger.error(error)
  }
}

maybeAddAdmin()
