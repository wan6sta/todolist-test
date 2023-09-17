import { describe, expect, it } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
import { componentRender } from '../../lib/tests/componentRender.tsx'
import { ToggleableButton } from './ToggleableButton.tsx'

describe('ToggleableButton', () => {
  it('Клик по кнопке открывает textArea, при нажатии на Enter вызывает колбек', () => {
    const someFn = vitest.fn()
    componentRender(<ToggleableButton onSave={someFn} buttonText="Кнопка" />)

    const buttonBox = screen.getByTestId('ToggleableButton')
    expect(buttonBox).toBeInTheDocument()

    const button = screen.getByTestId('ToggleableButton-button')
    expect(button).toBeInTheDocument()

    fireEvent.click(button)

    expect(button).not.toBeInTheDocument()

    const form = screen.getByTestId('ToggleableButton-form')
    expect(form).toBeInTheDocument()

    const textArea = screen.getByTestId('ToggleableButton-form-textArea')

    const newInputValue = 'Новое значение'
    fireEvent.change(textArea, { target: { value: newInputValue } })
    fireEvent.keyDown(textArea, { code: 'Enter' })

    expect(textArea).toBeInTheDocument()
    expect(someFn).toBeCalledWith(newInputValue)
  })

  it('Клик по кнопке открывает textArea, при нажатии на close закрывает', () => {
    componentRender(<ToggleableButton buttonText="Кнопка" />)

    const buttonBox = screen.getByTestId('ToggleableButton')
    expect(buttonBox).toBeInTheDocument()

    const button = screen.getByTestId('ToggleableButton-button')
    expect(button).toBeInTheDocument()

    fireEvent.click(button)

    expect(button).not.toBeInTheDocument()

    const closeButton = screen.getByTestId('ToggleableButton-close-button')

    fireEvent.click(closeButton)

    const newButton = screen.getByTestId('ToggleableButton-button')

    expect(newButton).toBeInTheDocument()
    expect(closeButton).not.toBeInTheDocument()
  })
})
