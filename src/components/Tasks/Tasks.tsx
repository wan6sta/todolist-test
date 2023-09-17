import { memo, useContext, useMemo } from 'react'
import { Flex } from '@radix-ui/themes'
import { TodosDataContext } from '../../providers/TodosProvider/TodosProvider.tsx'
import { TodolistFilters } from '../../interfaces/TodolistFilters.ts'
import { Task } from '../Task/Task.tsx'
import { todoCompletedFilter } from '../TodolistFilters/utils/todoCompletedFilter.ts'

interface TasksProps {
  todolistId: string
  todolistFilter: TodolistFilters
}

export const Tasks = memo((props: TasksProps) => {
  const { todolistId, todolistFilter } = props
  const todolistsMap = useContext(TodosDataContext)

  const filteredTasks = useMemo(() => {
    if (!todolistsMap) return null

    const todolist = todolistsMap[todolistId]

    const filteredTasks = todolist.tasks.filter((task) =>
      todoCompletedFilter(task, todolistFilter)
    )

    return filteredTasks.map((task) => (
      <Task task={task} key={task.id} todolistId={todolistId} />
    ))
  }, [todolistId, todolistFilter, todolistsMap])

  return (
    <Flex direction="column" gap="3">
      {filteredTasks}
    </Flex>
  )
})
