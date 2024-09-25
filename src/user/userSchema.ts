import { File } from 'buffer'
import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'

export type User = {
  _id: string
  login: string
  email?: string
  name: string
  role: 'admin' | 'user'
  password?: 'string'

  /* Added by `accounts-password` automatically */
  username: string
  createdAt: Date
  services: object
}

export const UsersCollection = Meteor.users

export const UserSchema = new SimpleSchema({
  _id: String,
  name: {
    type: String,
    optional: true,
  },
  role: {
    type: String,
    allowedValues: ['admin', 'user'],
    defaultValue: 'user',
  },
  email: {
    type: String,
    optional: true,
  },
  updatedAt: {
    type: Date,
    optional: true,
  },
  avatar: {
    type: File,
    optional: true,
  },

  /* Added by `accounts-password` automatically */
  username: String,
  createdAt: Date,
  services: {
    type: Object,
    optional: true,
    blackbox: true,
  },
})

UsersCollection.attachSchema(UserSchema)
