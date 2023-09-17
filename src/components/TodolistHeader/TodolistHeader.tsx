import { memo, useCallback, useContext } from 'react'
import { ToggleableInput } from '../ToggleableInput/ToggleableInput.tsx'
import { Flex } from '@radix-ui/themes'
import { TodosDispatchContext } from '../../providers/TodosProvider/TodosProvider.tsx'
import {
  deleteTodolist,
  editTodolistTitle,
} from '../../reducers/TodosReducer/TodosReducer.ts'
import { CrossIconButton } from '../CrossIconButton/CrossIconButton.tsx'

interface TodolistHeaderProps {
  todolistTitle: string
  todolistId: string
}

export const TodolistHeader = memo((props: TodolistHeaderProps) => {
  const { todolistTitle, todolistId } = props

  const dispatch = useContext(TodosDispatchContext)

  const handleTitleEdit = useCallback(
    (title: string) => {
      if (!dispatch) return
      dispatch(editTodolistTitle(todolistId, title))
    },
    [todolistId, dispatch]
  )

  const handleDelete = useCallback(() => {
    if (!dispatch) return
    dispatch(deleteTodolist(todolistId))
  }, [todolistId, dispatch])

  return (
    <Flex align="center" justify="between">
      <ToggleableInput initialText={todolistTitle} onClose={handleTitleEdit} />
      <CrossIconButton handleClick={handleDelete} />
    </Flex>
  )
})
