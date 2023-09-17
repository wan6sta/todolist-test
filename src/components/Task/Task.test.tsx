import { beforeEach, describe, expect, it } from 'vitest'
import { Task as ITask } from '../../interfaces/Task.ts'
import { Todolist as ITodolist } from '../../interfaces/Todolist.ts'
import { componentRender } from '../../lib/tests/componentRender.tsx'
import { fireEvent, screen } from '@testing-library/react'
import { Todolists } from '../Todolists/Todolists.tsx'

describe('Task', () => {
  beforeEach(() => {
    const taskData: ITask = {
      id: '1',
      title: 'Новая задача',
      completed: false,
    }

    const todolist: ITodolist = {
      id: '1',
      title: 'Новый тудулист',
      filter: 'all',
      tasks: [taskData],
    }

    componentRender(<Todolists />, {
      initialState: {
        '1': todolist,
      },
    })
  })

  it('Клик по чекбоксу меняет статус задачи', () => {
    const task = screen.getByTestId('task')
    expect(task).toBeInTheDocument()

    const taskCheckbox = screen.getByTestId('task-checkbox')
    expect(taskCheckbox).toBeInTheDocument()
    expect(taskCheckbox).not.toBeChecked()

    fireEvent.click(taskCheckbox)

    expect(taskCheckbox).toBeInTheDocument()
    expect(taskCheckbox).toBeChecked()
  })

  it('Клик по кнопке удаления задачи', () => {
    const task = screen.getByTestId('task')
    expect(task).toBeInTheDocument()

    const taskDeleteButton = screen.getByTestId('task-delete-button')
    expect(taskDeleteButton).toBeInTheDocument()

    fireEvent.click(taskDeleteButton)

    expect(task).not.toBeInTheDocument()
  })
})
