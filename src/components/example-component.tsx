import React from 'react'
import styled from 'styled-components'
import { Colors } from '../lib/style-guide'

interface AddInputProps {
  placeholder?: string
  buttonText?: string
  onSubmit?: (v: string) => void
  validationFn?: (v: string) => boolean
}

const AddInput: FC<AddInputProps> = (props) => {
  const { className, placeholder, onSubmit, validationFn = () => true } = props
  const [value, setValue] = React.useState<string>('')
  const [isFocused, setIsFocused] = React.useState<boolean>(false)
  const input = React.useRef<HTMLInputElement>(null)

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    },
    [setValue]
  )

  const onClick = React.useCallback<
    (e?: React.MouseEvent<HTMLButtonElement>) => void
  >(() => {
    if (!value) return
    if (!validationFn(value)) return

    onSubmit && onSubmit(value)
    setValue('')
    setIsFocused(false)

    if (input.current) {
      input.current.focus()
    }
  }, [value, validationFn, onSubmit])

  const onFocus = React.useCallback<
    (e: React.FocusEvent<HTMLInputElement>) => void
  >(() => {
    setIsFocused(true)
  }, [setIsFocused])

  const onBlur = React.useCallback<
    (e: React.FocusEvent<HTMLInputElement>) => void
  >(() => {
    if (value) onClick()
    setIsFocused(false)
  }, [onClick, value])

  const onKeydown = React.useCallback<
    (e: React.KeyboardEvent<HTMLInputElement>) => void
  >(
    (e) => {
      if (e.which === 13) onClick()
    },
    [onClick]
  )

  return (
    <div
      className={`${className} ${(isFocused || value) && 'focused'}`}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <input
        ref={input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={onKeydown}
      />
      {value && <div>[enter] ⏎</div>}
    </div>
  )
}

const StyledAddInput = styled(AddInput)`
  display: flex;
  border: 1px solid #fff;
  border-bottom: 1px solid #e8f1fb;
  padding: 0 10px;

  &.focused {
    border-bottom: 1px solid ${Colors.AccordBlue};
  }

  input {
    display: flex;
    align-items: center;
    height: 40px;
    width: 100%;

    font-size: 14px;
    line-height: 14px;
    color: ${Colors.TX1};

    transition: background-color 200ms;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: ${Colors.TX3};
    }
  }

  div {
    display: flex;
    align-items: center;
    font-size: 10px;
    color: ${Colors.TX3};
    opacity: 0.5;
    white-space: nowrap;
  }
`

export { StyledAddInput as AddInput }
