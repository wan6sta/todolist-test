import { Card, Flex } from '@radix-ui/themes'
import { TaskCreator } from '../TaskCreator/TaskCreator.tsx'
import { memo } from 'react'
import { TodolistHeader } from '../TodolistHeader/TodolistHeader.tsx'
import { Todolist as ITodolist } from '../../interfaces/Todolist.ts'
import { TodolistFilters } from '../TodolistFilters/TodolistFilters.tsx'
import cls from './Todolist.module.css'
import { Tasks } from '../Tasks/Tasks.tsx'

interface TodolistProps {
  todolist: ITodolist
}

export const Todolist = memo((props: TodolistProps) => {
  const { todolist } = props

  return (
    <Card className={cls.Todolist}>
      <Flex direction="column" gap="3">
        <TodolistHeader
          todolistId={todolist.id}
          todolistTitle={todolist.title}
        />
        <TodolistFilters
          todolistId={todolist.id}
          todolistFilter={todolist.filter}
        />
        <Flex direction="column" gap="3">
          <Tasks todolistId={todolist.id} todolistFilter={todolist.filter} />
          <TaskCreator todolistId={todolist.id} />
        </Flex>
      </Flex>
    </Card>
  )
})
