import { check } from 'meteor/check'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { checkCondition } from '/src/libs/helpers'
import { Task, TasksCollection } from '../taskSchema'

export async function addTask({ name, description }: Task) {
  try {
    check(name, String)

    const taskId = await TasksCollection.insertAsync({
      name,
      description,
      createdAt: new Date(),
      userId: 'ere43434ffee34egr4567hdf',
    })

    const addedTask = await TasksCollection.findOneAsync(taskId)
    checkCondition(addedTask, 'Task not added!')

    return { ok: true, addedTask }
  } catch (error) {
    console.log('error: ', error)
    return { ok: false, error }
  }
}

export async function getTasks(
  filters: object | undefined,
  options: object | undefined,
) {
  try {
    const tasks = await TasksCollection.find(
      filters || {},
      options as Mongo.Options<object>,
    ).fetch()

    return { ok: true, tasks }
  } catch (error) {
    console.log('error: ', error)
    return { ok: false, error }
  }
}

export async function updateTask({
  _id: taskId,
  name,
  description,
}: Task) {
  try {
    check(taskId, String)
    if (name) check(name, String)

    const task = await TasksCollection.findOneAsync(taskId)
    checkCondition(task, 'Task not found!')

    await TasksCollection.updateAsync(taskId, {
      $set: {
        name: name || task?.name,
        description: description || task?.description,
        updatedAt: new Date(),
      },
    })

    const updatedTask = await TasksCollection.findOneAsync(taskId)

    return { ok: true, updatedTask }
  } catch (error) {
    console.log('error: ', error)
    return { ok: false, error }
  }
}

export async function removeTask(taskId: string) {
  try {
    check(taskId, String)

    const task = await TasksCollection.findOneAsync(taskId)
    checkCondition(task, 'Task not found!')

    let result
    if (task) {
      result = await TasksCollection.removeAsync(taskId)
    }

    return { ok: true, isTaskRemoved: Boolean(result) }
  } catch (error) {
    console.log('error: ', error)
    return { ok: false, error }
  }
}
