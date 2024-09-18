import { WebApp } from 'meteor/webapp'
import { parseQuery } from '/src/libs'
import { logger } from '/src/libs/server'
import { queryFilter } from '../../types'
import { Task } from '../taskSchema'
import {
  addTask,
  getTasks,
  removeTask,
  updateTask,
} from './taskMethods'

WebApp.handlers.post('/tasks/add', async (req, res) => {
  try {
    const result = await addTask(req.body)

    if (result.ok) {
      res.status(200).json(result.addedTask)
    } else {
      logger.error(result.error, res)
    }
  } catch (error) {
    logger.error(error, res)
  }
})

WebApp.handlers.get('/tasks', async (req, res) => {
  try {
    const { filters, options } = parseQuery(req.query as queryFilter)

    const result = await getTasks(filters, options)

    if (result.ok) {
      res.status(200).json(result.tasks)
    } else {
      logger.error(result.error, res)
    }
  } catch (error) {
    logger.error(error, res)
  }
})

WebApp.handlers.put('/tasks/update', async (req, res) => {
  try {
    if (req.query?.id) {
      req.body._id = req.query.id
    }

    const result = await updateTask(req.body as Task)

    if (result.ok) {
      res.status(200).json(result.updatedTask)
    } else {
      logger.error(result.error, res)
    }
  } catch (error) {
    logger.error(error, res)
  }
})

WebApp.handlers.delete('/tasks/remove/:taskId', async (req, res) => {
  try {
    const result = await removeTask(req.params.taskId)

    if (result.ok) {
      res.status(200).json(result)
    } else {
      logger.error(result.error, res)
    }
  } catch (error) {
    logger.error(error, res)
  }
})
