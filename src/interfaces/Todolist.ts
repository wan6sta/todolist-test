import { Task } from './Task.ts'
import { TodolistFilters } from './TodolistFilters.ts'

export interface Todolist {
  id: string
  filter: TodolistFilters
  title: string
  tasks: Task[]
}
