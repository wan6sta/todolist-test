import { describe, expect, it } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
import { componentRender } from '../../lib/tests/componentRender.tsx'
import { ToggleableInput } from './ToggleableInput.tsx'

describe('ToggleableInput', () => {
  it('Клик по тексту открывает инпут, при нажатии на Enter закрывается', () => {
    const someFn = vitest.fn()
    componentRender(
      <ToggleableInput initialText="Некоторый текст" onClose={someFn} />
    )

    const inputBox = screen.getByTestId('ToggleableInput')
    expect(inputBox).toBeInTheDocument()

    const text = screen.getByTestId('ToggleableInput-text')
    expect(text).toBeInTheDocument()

    fireEvent.click(text)

    expect(text).not.toBeInTheDocument()

    const input = screen.getByTestId('ToggleableInput-input')
    expect(input).toBeInTheDocument()

    const newInputValue = 'Новое значение'
    fireEvent.change(input, { target: { value: newInputValue } })
    fireEvent.keyDown(input, { code: 'Enter' })

    expect(input).not.toBeInTheDocument()
    expect(someFn).toBeCalledWith(newInputValue)
  })
})
