import {
  ChangeEvent,
  KeyboardEvent,
  memo,
  useCallback,
  useRef,
  useState,
} from 'react'
import { Box, Button, Flex, TextArea } from '@radix-ui/themes'
import { PlusIcon } from '@radix-ui/react-icons'
import { CrossIconButton } from '../CrossIconButton/CrossIconButton.tsx'
import { useClickAway } from 'react-use'

interface ToggleableButton {
  onSave?: (text: string) => void
  buttonText: string
  textAreaPlaceholder?: string
  saveOnClickAway?: boolean
}

export const ToggleableButton = memo((props: ToggleableButton) => {
  const { onSave, buttonText, textAreaPlaceholder, saveOnClickAway } = props

  const [open, setOpen] = useState(false)
  const [textAreaValue, setTextAreaValue] = useState('')
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const toggleableButtonRef = useRef<HTMLDivElement | null>(null)

  useClickAway(toggleableButtonRef, () => {
    setOpen(false)

    if (saveOnClickAway && open) {
      if (!textAreaValue) return
      onSave?.(textAreaValue)
      setTextAreaValue('')
    }
  })

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
    setTextAreaValue('')
  }, [])

  const handleTextAreaChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setTextAreaValue(e.currentTarget.value)
    },
    []
  )

  const handleSave = useCallback(() => {
    if (!textAreaValue.trim()) return
    onSave?.(textAreaValue)
    setTextAreaValue('')

    if (textAreaRef.current) {
      textAreaRef.current.focus()
    }
  }, [onSave, textAreaValue])

  const handleCloseEnter = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.code === 'Enter') {
        handleSave()
      }
    },
    [handleSave]
  )

  return (
    <Box data-testid="ToggleableButton" ref={toggleableButtonRef}>
      {!open && (
        <Button data-testid="ToggleableButton-button" onClick={handleOpen}>
          <PlusIcon width={20} height={20} /> {buttonText}
        </Button>
      )}

      {open && (
        <Flex data-testid="ToggleableButton-form" direction="column" gap="3">
          <TextArea
            data-testid="ToggleableButton-form-textArea"
            onKeyDown={handleCloseEnter}
            ref={textAreaRef}
            value={textAreaValue}
            onChange={handleTextAreaChange}
            autoFocus
            placeholder={textAreaPlaceholder}
          />
          <Flex align="center" gap="3">
            <Button onClick={handleSave}>{buttonText}</Button>
            <CrossIconButton
              handleClick={handleClose}
              data-testid="ToggleableButton-close-button"
            />
          </Flex>
        </Flex>
      )}
    </Box>
  )
})
