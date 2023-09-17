import { memo, useCallback, useContext } from 'react'
import { ToggleableButton } from '../ToggleableButton/ToggleableButton.tsx'
import { TodosDispatchContext } from '../../providers/TodosProvider/TodosProvider.tsx'
import { createTodolist } from '../../reducers/TodosReducer/TodosReducer.ts'

export const TodolistCreator = memo(() => {
  const dispatch = useContext(TodosDispatchContext)

  const handleSave = useCallback(
    (title: string) => {
      if (!dispatch) return

      dispatch(createTodolist(title))
    },
    [dispatch]
  )

  return (
    <ToggleableButton
      buttonText="Add todolist"
      textAreaPlaceholder="Enter a title for this todolist"
      onSave={handleSave}
    />
  )
})
