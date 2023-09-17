import { memo } from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'

interface CrossIconButtonProps {
  handleClick: () => void
}

export const CrossIconButton = memo((props: CrossIconButtonProps) => {
  const { handleClick, ...restProps } = props

  return (
    <IconButton
      data-testid="CrossIconButton"
      variant="ghost"
      onClick={handleClick}
      {...restProps}
    >
      <Cross1Icon />
    </IconButton>
  )
})
