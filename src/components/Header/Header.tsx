import { Heading } from '@radix-ui/themes'
import { memo } from 'react'

export const Header = memo(() => {
  return (
    <Heading mb="2" size="9" color="blue">
      Todos
    </Heading>
  )
})
