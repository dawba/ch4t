import React, { useState, useEffect, useRef } from 'react'
import styles from './CustomTextField.module.css'

interface CustomTextFieldProps {
  initialHeight?: number
  maxHeight?: number
  handleSubmit: (value: string) => void
}

const CustomTextField = ({
  initialHeight = 50,
  maxHeight = 200,
  handleSubmit,
}: CustomTextFieldProps) => {
  const [height, setHeight] = useState(initialHeight)
  const [value, setValue] = useState('')
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    adjustHeight()
  }, [value])

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
    adjustHeight()
  }

  const adjustHeight = () => {
    if (textAreaRef.current) {
      const scrollHeight = textAreaRef.current.scrollHeight

      if (scrollHeight > height && height < maxHeight) {
        setHeight(Math.min(scrollHeight, maxHeight))
      }
    }
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Prevent default form submission
    handleSubmit(value)
    setValue('')
    setHeight(initialHeight)
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <textarea
        ref={textAreaRef}
        className={styles.customTextField}
        style={{ height: `${height}px`, color: '#FBFF4A' }}
        value={value}
        onChange={handleInput}
      />
      <button type="submit">send</button>
    </form>
  )
}

export default CustomTextField
