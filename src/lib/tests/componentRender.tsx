import { ReactNode, useReducer } from 'react'
import { TodolistsMap } from '../../interfaces/TodolistsMap.ts'
import { render } from '../../utils/test-utils.tsx'
import {
  TodosDataContext,
  TodosDispatchContext,
} from '../../providers/TodosProvider/TodosProvider.tsx'
import { todosReducer } from '../../reducers/TodosReducer/TodosReducer.ts'

export interface componentRenderOptions {
  initialState?: TodolistsMap
}

interface TestProviderProps {
  children: ReactNode
  options?: componentRenderOptions
}

export function TestProvider(props: TestProviderProps) {
  const { children, options = {} } = props
  const { initialState } = options
  const [todolists, dispatch] = useReducer(todosReducer, initialState || {})

  return (
    <TodosDataContext.Provider value={todolists}>
      <TodosDispatchContext.Provider value={dispatch}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosDataContext.Provider>
  )
}

export function componentRender(
  component: ReactNode,
  options: componentRenderOptions = {}
) {
  return render(<TestProvider options={options}>{component}</TestProvider>)
}
