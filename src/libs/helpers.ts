import { Meteor } from 'meteor/meteor'
import { queryFilter } from 'src/types'

export const checkCondition = (
  condition: unknown,
  errorMsg: string,
) => {
  if (!condition) throw new Meteor.Error(errorMsg)
}

export function parseQuery(queryObject: queryFilter | undefined) {
  if (queryObject) {
    const { sort_by, order_by, limit, page, ...filters } = queryObject

    return {
      filters,
      options: {
        ...(sort_by && {
          sort: { [sort_by]: order_by == 'asc' ? 1 : -1 },
        }),
        ...(page && { skip: page * (limit || 1) }),
        limit: Number(limit),
      },
    }
  }

  return {}
}

export function validateEmail(emailString: string) {
  const emailRegex =
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g

  return checkCondition(
    emailRegex.test(emailString),
    'The email is incorrect!',
  )
}

export function validatePassword(passwordString: string) {
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/g

  return checkCondition(
    passwordRegex.test(passwordString),
    `The password is incorrect!
  The password must:
  - be between 6 and 18 characters long
  - contain at least one letter
  - contain at least one number
  - contain at least one special character`,
  )
}
