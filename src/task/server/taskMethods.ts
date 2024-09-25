import { check } from 'meteor/check'
import { Mongo } from 'meteor/mongo'
import { checkCondition } from '/src/libs/helpers'
import { userAuthType } from '/src/types'
import { Task, TasksCollection } from '../taskSchema'

export async function addTask(
  { userIdAuth: userId }: userAuthType,
  { name, description }: Task,
) {
  try {
    check(userId, String)
    check(name, String)

    const taskId = await TasksCollection.insertAsync({
      name,
      description,
      createdAt: new Date(),
      userId,
    })

    const addedTask = await TasksCollection.findOneAsync(taskId)
    checkCondition(addedTask, 'Task not added!')

    return { ok: true, addedTask }
  } catch (error) {
    return { ok: false, error }
  }
}

export async function getTasks(
  { userIdAuth: userId, roleAuth }: userAuthType,
  filters: object | undefined,
  options: object | undefined,
) {
  try {
    check(userId, String)
    check(roleAuth, String)

    const isUserId = roleAuth == 'user' && { userId }
    const tasks = await TasksCollection.find(
      { ...filters, ...isUserId },
      options as Mongo.Options<object>,
    ).fetch()

    return { ok: true, tasks }
  } catch (error) {
    return { ok: false, error }
  }
}

export async function updateTask(
  { userIdAuth: userId, roleAuth }: userAuthType,
  { _id: taskId, name, description }: Task,
) {
  try {
    check(userId, String)
    check(roleAuth, String)
    check(taskId, String)
    if (name) check(name, String)

    const isUserId = roleAuth == 'user' && { userId }
    const task = await TasksCollection.findOneAsync({
      _id: taskId,
      ...isUserId,
    })
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
    return { ok: false, error }
  }
}

export async function removeTask(
  { userIdAuth: userId, roleAuth }: userAuthType,
  taskId: string,
) {
  try {
    check(userId, String)
    check(roleAuth, String)
    check(taskId, String)

    const isUserId = roleAuth == 'user' && { userId }
    const task = await TasksCollection.findOneAsync({
      _id: taskId,
      ...isUserId,
    })
    checkCondition(task, 'Task not found!')

    let result
    if (task) {
      result = await TasksCollection.removeAsync(taskId)
    }

    return { ok: true, isTaskRemoved: Boolean(result) }
  } catch (error) {
    return { ok: false, error }
  }
}
