import { TodolistsMap } from '../../interfaces/TodolistsMap.ts'
import { v4 as uuidv4 } from 'uuid'
import { Todolist } from '../../interfaces/Todolist.ts'
import { TodolistFilters } from '../../interfaces/TodolistFilters.ts'

export type TodosActions =
  | ReturnType<typeof createTodolist>
  | ReturnType<typeof deleteTodolist>
  | ReturnType<typeof editTodolistTitle>
  | ReturnType<typeof editTodolistFilter>
  | ReturnType<typeof createTask>
  | ReturnType<typeof deleteTask>
  | ReturnType<typeof editTaskCompleted>
  | ReturnType<typeof editTaskTitle>

export const todosReducer = (state: TodolistsMap, action: TodosActions) => {
  switch (action.type) {
    case 'CREATE_TODOLIST': {
      const newTodolistId = uuidv4()

      const newTodolist: Todolist = {
        id: newTodolistId,
        filter: 'all',
        title: action.payload,
        tasks: [],
      }

      return {
        ...state,
        [newTodolistId]: newTodolist,
      }
    }

    case 'DELETE_TODOLIST': {
      const newState = { ...state }
      delete newState[action.payload]
      return newState
    }

    case 'EDIT_TODOLIST_TITLE': {
      const { todoId, newTitle } = action.payload

      return {
        ...state,
        [todoId]: {
          ...state[todoId],
          title: newTitle,
        },
      }
    }

    case 'EDIT_TODOLIST_FILTER': {
      const { todoId, newFilter } = action.payload

      return {
        ...state,
        [todoId]: {
          ...state[todoId],
          filter: newFilter,
        },
      }
    }

    case 'CREATE_TASK': {
      const { todoId, title } = action.payload

      const newTask = {
        id: uuidv4(),
        title,
        completed: false,
      }

      return {
        ...state,
        [todoId]: {
          ...state[todoId],
          tasks: [...state[todoId].tasks, newTask],
        },
      }
    }

    case 'DELETE_TASK': {
      const { todoId, taskId } = action.payload

      return {
        ...state,
        [todoId]: {
          ...state[todoId],
          tasks: state[todoId].tasks.filter((task) => task.id !== taskId),
        },
      }
    }

    case 'EDIT_TASK_COMPLETED': {
      const { todoId, taskId, completed } = action.payload

      return {
        ...state,
        [todoId]: {
          ...state[todoId],
          tasks: state[todoId].tasks.map((task) => {
            if (task.id === taskId) {
              return {
                ...task,
                completed,
              }
            }
            return task
          }),
        },
      }
    }

    case 'EDIT_TASK_TITLE': {
      const { todoId, taskId, newTitle } = action.payload

      return {
        ...state,
        [todoId]: {
          ...state[todoId],
          tasks: state[todoId].tasks.map((task) => {
            if (task.id === taskId) {
              return {
                ...task,
                title: newTitle,
              }
            }
            return task
          }),
        },
      }
    }
  }
}

export const createTodolist = (title: string) => {
  return {
    type: 'CREATE_TODOLIST',
    payload: title,
  } as const
}

export const deleteTodolist = (todoId: string) => {
  return {
    type: 'DELETE_TODOLIST',
    payload: todoId,
  } as const
}

export const editTodolistTitle = (todoId: string, newTitle: string) => {
  return {
    type: 'EDIT_TODOLIST_TITLE',
    payload: { todoId, newTitle },
  } as const
}

export const editTodolistFilter = (
  todoId: string,
  newFilter: TodolistFilters
) => {
  return {
    type: 'EDIT_TODOLIST_FILTER',
    payload: { todoId, newFilter },
  } as const
}

export const createTask = (todoId: string, title: string) => {
  return {
    type: 'CREATE_TASK',
    payload: { todoId, title },
  } as const
}

export const deleteTask = (todoId: string, taskId: string) => {
  return {
    type: 'DELETE_TASK',
    payload: { todoId, taskId },
  } as const
}

export const editTaskCompleted = (
  todoId: string,
  taskId: string,
  completed: boolean
) => {
  return {
    type: 'EDIT_TASK_COMPLETED',
    payload: { todoId, taskId, completed },
  } as const
}

export const editTaskTitle = (
  todoId: string,
  taskId: string,
  newTitle: string
) => {
  return {
    type: 'EDIT_TASK_TITLE',
    payload: { todoId, taskId, newTitle },
  } as const
}
