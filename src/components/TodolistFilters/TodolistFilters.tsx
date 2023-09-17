import { memo, useCallback, useContext } from 'react'
import { Button, Flex } from '@radix-ui/themes'
import { TodosDispatchContext } from '../../providers/TodosProvider/TodosProvider.tsx'
import { editTodolistFilter } from '../../reducers/TodosReducer/TodosReducer.ts'
import { TodolistFilters as ITodolistFilters } from '../../interfaces/TodolistFilters.ts'

interface TodolistFiltersProps {
  todolistId: string
  todolistFilter: ITodolistFilters
}

export const TodolistFilters = memo((props: TodolistFiltersProps) => {
  const { todolistId, todolistFilter } = props
  const dispatch = useContext(TodosDispatchContext)

  const handleAll = useCallback(() => {
    if (!dispatch) return null
    dispatch(editTodolistFilter(todolistId, 'all'))
  }, [dispatch, todolistId])

  const handleActive = useCallback(() => {
    if (!dispatch) return null
    dispatch(editTodolistFilter(todolistId, 'active'))
  }, [dispatch, todolistId])

  const handleCompleted = useCallback(() => {
    if (!dispatch) return null
    dispatch(editTodolistFilter(todolistId, 'completed'))
  }, [dispatch, todolistId])

  const allVariant = todolistFilter === 'all' ? 'outline' : 'soft'
  const activeVariant = todolistFilter === 'active' ? 'outline' : 'soft'
  const completedVariant = todolistFilter === 'completed' ? 'outline' : 'soft'

  return (
    <Flex gap="3" mb="2">
      <Button variant={allVariant} onClick={handleAll}>
        All
      </Button>
      <Button variant={activeVariant} onClick={handleActive}>
        Active
      </Button>
      <Button variant={completedVariant} onClick={handleCompleted}>
        Completed
      </Button>
    </Flex>
  )
})
