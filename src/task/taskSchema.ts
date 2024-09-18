import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'

export type Task = {
  _id: string
  name: string | undefined
  description: string | undefined
  createdAt: Date
  userId: string
}

export const TasksCollection = new Mongo.Collection('tasks')

export const TaskSchema = new SimpleSchema({
  name: String,
  description: String,
  createdAt: Date,
  updatedAt: {
    type: Date,
    optional: true,
  },
  userId: String,
})

TasksCollection.attachSchema(TaskSchema)
