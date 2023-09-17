import { memo, useCallback, useContext } from 'react'
import { ToggleableButton } from '../ToggleableButton/ToggleableButton.tsx'
import { TodosDispatchContext } from '../../providers/TodosProvider/TodosProvider.tsx'
import { createTask } from '../../reducers/TodosReducer/TodosReducer.ts'

interface TaskCreatorProps {
  todolistId: string
}

export const TaskCreator = memo((props: TaskCreatorProps) => {
  const { todolistId } = props
  const dispatch = useContext(TodosDispatchContext)

  const handleSave = useCallback(
    (title: string) => {
      if (!dispatch) return

      dispatch(createTask(todolistId, title))
    },
    [dispatch, todolistId]
  )

  return (
    <ToggleableButton
      buttonText="Add task"
      textAreaPlaceholder="Enter a title for this task"
      onSave={handleSave}
      saveOnClickAway
    />
  )
})
