import { beforeEach, describe, expect, test } from 'vitest'
import {
  todosReducer,
  createTodolist,
  deleteTodolist,
  editTodolistTitle,
  editTodolistFilter,
  createTask,
  deleteTask,
  editTaskCompleted,
  editTaskTitle,
} from './TodosReducer.ts'
import { TodolistsMap } from '../../interfaces/TodolistsMap.ts'

describe('TodolistsReducer', () => {
  let initialState: TodolistsMap = {}

  beforeEach(() => {
    initialState = {}
  })

  test('Добавляет новый тудулист', () => {
    const newTitle = 'Новый тудулист'
    const newState = todosReducer(initialState, createTodolist(newTitle))
    const newTodolist = Object.values(newState)[0]

    expect(typeof newTodolist.id).toBe('string')
    expect(newTodolist.filter).toEqual('all')
    expect(newTodolist.title).toEqual(newTitle)
    expect(newTodolist.tasks.length).toEqual(0)
  })

  test('Удаляет тудулист', () => {
    initialState = {
      '1': {
        id: '1',
        filter: 'all',
        title: 'Тудулист 1',
        tasks: [],
      },
      '2': {
        id: '2',
        filter: 'all',
        title: 'Тудулист 2',
        tasks: [],
      },
    }
    const newState = todosReducer(initialState, deleteTodolist('1'))

    expect(newState['2']).toEqual(initialState['2'])
    expect(Object.values(newState).length).not.toEqual(
      Object.values(initialState).length
    )
  })

  test('Изменяет название тудулиста', () => {
    initialState = {
      '1': {
        id: '1',
        filter: 'all',
        title: 'Старое название',
        tasks: [],
      },
    }

    const newState = todosReducer(
      initialState,
      editTodolistTitle('1', 'Новое название')
    )

    expect(newState).toEqual({
      '1': {
        id: '1',
        filter: 'all',
        title: 'Новое название',
        tasks: [],
      },
    })
  })

  test('Изменяет фильтр тудулиста', () => {
    initialState = {
      '1': {
        id: '1',
        filter: 'all',
        title: 'Тудулист 1',
        tasks: [],
      },
    }
    const newState = todosReducer(
      initialState,
      editTodolistFilter('1', 'completed')
    )

    expect(newState).toEqual({
      '1': {
        id: '1',
        filter: 'completed',
        title: 'Тудулист 1',
        tasks: [],
      },
    })
  })

  test('Добавляет новую задачу в тудулист', () => {
    initialState = {
      '1': {
        id: '1',
        filter: 'all',
        title: 'Тудулист с задачами',
        tasks: [],
      },
    }
    const newTitle = 'Новая задача'
    const newState = todosReducer(initialState, createTask('1', newTitle))

    expect(newState).toEqual({
      '1': {
        id: '1',
        filter: 'all',
        title: 'Тудулист с задачами',
        tasks: [
          {
            id: newState['1'].tasks[0].id,
            title: newTitle,
            completed: false,
          },
        ],
      },
    })
  })

  test('Удаляет задачу из тудулиста', () => {
    initialState = {
      '1': {
        id: '1',
        filter: 'all',
        title: 'Тудулист с задачей',
        tasks: [
          {
            id: 'task1',
            title: 'Задача 1',
            completed: false,
          },
          {
            id: 'task2',
            title: 'Задача 2',
            completed: true,
          },
        ],
      },
    }
    const newState = todosReducer(initialState, deleteTask('1', 'task1'))

    expect(newState).toEqual({
      '1': {
        id: '1',
        filter: 'all',
        title: 'Тудулист с задачей',
        tasks: [
          {
            id: 'task2',
            title: 'Задача 2',
            completed: true,
          },
        ],
      },
    })
  })

  test('Изменяет статус выполнения задачи', () => {
    initialState = {
      '1': {
        id: '1',
        filter: 'all',
        title: 'Тудулист с задачей',
        tasks: [
          {
            id: 'task1',
            title: 'Задача 1',
            completed: false,
          },
        ],
      },
    }
    const newState = todosReducer(
      initialState,
      editTaskCompleted('1', 'task1', true)
    )

    expect(newState).toEqual({
      '1': {
        id: '1',
        filter: 'all',
        title: 'Тудулист с задачей',
        tasks: [
          {
            id: 'task1',
            title: 'Задача 1',
            completed: true,
          },
        ],
      },
    })
  })

  test('Изменяет название задачи', () => {
    initialState = {
      '1': {
        id: '1',
        filter: 'all',
        title: 'Тудулист с задачей',
        tasks: [
          {
            id: 'task1',
            title: 'Задача 1',
            completed: false,
          },
        ],
      },
    }
    const newTitle = 'Новое название'
    const newState = todosReducer(
      initialState,
      editTaskTitle('1', 'task1', newTitle)
    )

    expect(newState).toEqual({
      '1': {
        id: '1',
        filter: 'all',
        title: 'Тудулист с задачей',
        tasks: [
          {
            id: 'task1',
            title: newTitle,
            completed: false,
          },
        ],
      },
    })
  })
})
