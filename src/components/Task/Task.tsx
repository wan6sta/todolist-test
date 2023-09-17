import { memo, useCallback, useContext } from 'react'
import { Task as ITask } from '../../interfaces/Task.ts'
import { Checkbox, Flex } from '@radix-ui/themes'
import { ToggleableInput } from '../ToggleableInput/ToggleableInput.tsx'
import { TodosDispatchContext } from '../../providers/TodosProvider/TodosProvider.tsx'
import {
  deleteTask,
  editTaskCompleted,
  editTaskTitle,
} from '../../reducers/TodosReducer/TodosReducer.ts'
import { CrossIconButton } from '../CrossIconButton/CrossIconButton.tsx'

interface TaskProps {
  todolistId: string
  task: ITask
}

export const Task = memo((props: TaskProps) => {
  const { todolistId, task } = props
  const dispatch = useContext(TodosDispatchContext)

  const handleDelete = useCallback(() => {
    if (!dispatch) return
    dispatch(deleteTask(todolistId, task.id))
  }, [dispatch, task.id, todolistId])

  const handleEditTaskCompleted = useCallback(() => {
    if (!dispatch) return
    dispatch(editTaskCompleted(todolistId, task.id, !task.completed))
  }, [dispatch, task.id, todolistId, task.completed])

  const handleEditTaskTitle = useCallback(
    (title: string) => {
      if (!dispatch) return
      dispatch(editTaskTitle(todolistId, task.id, title))
    },
    [dispatch, task.id, todolistId]
  )

  return (
    <Flex data-testid="task" gap="2" align="center" justify="between">
      <Flex gap="4">
        <Checkbox
          data-testid="task-checkbox"
          size="1"
          checked={task.completed}
          onClick={handleEditTaskCompleted}
        />
        <ToggleableInput
          initialText={task.title}
          onClose={handleEditTaskTitle}
          regularTextWeight
        />
      </Flex>
      <CrossIconButton
        data-testid="task-delete-button"
        handleClick={handleDelete}
      />
    </Flex>
  )
})
