import { Task } from '../../../interfaces/Task.ts'
import { TodolistFilters } from '../../../interfaces/TodolistFilters.ts'

export const todoCompletedFilter = (
  task: Task,
  todolistFilter: TodolistFilters
) => {
  if (todolistFilter === 'all') return true
  if (todolistFilter === 'active') return !task.completed
  if (todolistFilter === 'completed') return task.completed
  return true
}
