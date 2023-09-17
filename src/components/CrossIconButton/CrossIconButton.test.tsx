import { beforeEach, describe, expect, it, vitest } from 'vitest'
import { componentRender } from '../../lib/tests/componentRender.tsx'
import { CrossIconButton } from './CrossIconButton.tsx'
import { fireEvent, screen } from '@testing-library/react'

describe('CrossIconButton', () => {
  beforeEach(() => {})

  it('Клик по CrossIconButton вызывает колбек', () => {
    const someFn = vitest.fn()
    componentRender(<CrossIconButton handleClick={someFn} />)

    const crossBtn = screen.getByTestId('CrossIconButton')
    fireEvent.click(crossBtn)

    expect(crossBtn).toBeInTheDocument()
    expect(someFn).toBeCalledTimes(1)
  })
})
