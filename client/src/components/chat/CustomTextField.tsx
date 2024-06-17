import React, { useState, useEffect, useRef } from 'react';
import styles from '../../styles/CustomTextField.module.css';

interface CustomTextFieldProps {
  initialHeight?: number;
  maxHeight?: number;
  handleSubmit: (s: string) => void;
}

const CustomTextField = ({
  initialHeight = 40,
  maxHeight = 200,
  handleSubmit,
}: CustomTextFieldProps) => {
  const [height, setHeight] = useState(initialHeight);
  const [value, setValue] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    adjustHeight();
  }, [value]);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    adjustHeight();
  };

  const adjustHeight = () => {
    if (textAreaRef.current) {
      const scrollHeight = textAreaRef.current.scrollHeight;

      if (scrollHeight > height && height < maxHeight) {
        setHeight(Math.min(scrollHeight, maxHeight));
      }
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    handleSubmit(value);
    setValue('');
    setHeight(initialHeight);
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-row gap-5">
      <textarea
        ref={textAreaRef}
        className={styles.customTextField}
        style={{ height: `${height}px` }}
        value={value}
        onChange={handleInput}
      />
      <button
        className="border-primary-yellow border-2 rounded-xl mx-auto h-10 w-24 hover:opacity-80"
        type="submit"
      >
        Send
      </button>
    </form>
  );
};

export default CustomTextField;
