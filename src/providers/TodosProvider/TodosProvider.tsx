import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  useEffect,
  useReducer,
} from 'react'
import { TodolistsMap } from '../../interfaces/TodolistsMap.ts'
import {
  TodosActions,
  todosReducer,
} from '../../reducers/TodosReducer/TodosReducer.ts'
import { useLocalStorage } from 'react-use'

export const TodosDataContext = createContext<TodolistsMap | null>(null)
export const TodosDispatchContext =
  createContext<Dispatch<TodosActions> | null>(null)

export const TodosProvider: FC<PropsWithChildren> = ({ children }) => {
  const [value, setValue] = useLocalStorage('todos', {})
  const [todolists, dispatch] = useReducer(todosReducer, value || {})

  useEffect(() => {
    setValue(todolists)
  }, [todolists, setValue])

  return (
    <TodosDataContext.Provider value={todolists}>
      <TodosDispatchContext.Provider value={dispatch}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosDataContext.Provider>
  )
}
