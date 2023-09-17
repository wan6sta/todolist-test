import { ChangeEvent, KeyboardEvent, memo, useCallback, useState } from 'react'
import { Box, Text, TextField } from '@radix-ui/themes'
import cls from './ToggleableInput.module.css'

interface ToggleableInputProps {
  initialText: string
  onClose?: (text: string) => void
  regularTextWeight?: boolean
}

export const ToggleableInput = memo((props: ToggleableInputProps) => {
  const { initialText, onClose, regularTextWeight } = props
  const [text, setText] = useState(initialText)
  const [open, setOpen] = useState(false)

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    if (!text.trim()) return
    onClose?.(text)
    setOpen(false)
  }, [onClose, text])

  const handleCloseEnter = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.code === 'Enter') {
        handleClose()
      }
    },
    [handleClose]
  )

  const handleTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
  }, [])

  return (
    <Box data-testid="ToggleableInput" tabIndex={1}>
      {!open && (
        <Text
          data-testid="ToggleableInput-text"
          className={cls.ToggleableInputText}
          weight={regularTextWeight ? 'regular' : 'medium'}
          onClick={handleOpen}
        >
          {text}
        </Text>
      )}

      {open && (
        <TextField.Input
          data-testid="ToggleableInput-input"
          maxLength={30}
          onKeyDown={handleCloseEnter}
          value={text}
          autoFocus
          onChange={handleTextChange}
          onBlur={handleClose}
        />
      )}
    </Box>
  )
})
