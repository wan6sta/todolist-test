import { memo, useContext } from 'react'
import { TodosDataContext } from '../../providers/TodosProvider/TodosProvider.tsx'
import { Todolist } from '../Todolist/Todolist.tsx'

export const Todolists = memo(() => {
  const todolistsMap = useContext(TodosDataContext)

  if (!todolistsMap) return null

  const todolists = Object.values(todolistsMap)

  return todolists.map((todolist) => (
    <Todolist key={todolist.id} todolist={todolist} />
  ))
})
