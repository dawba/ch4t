import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/CustomTextField.module.css';

interface CustomTextFieldProps {
  initialHeight?: number;
  maxHeight?: number;
}

const CustomTextField = ({
  initialHeight = 50,
  maxHeight = 200,
}:CustomTextFieldProps) => {
  const [height, setHeight] = useState(initialHeight);
  const [value, setValue] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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

  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <textarea
      ref={textAreaRef}
      className={styles.customTextField}
      style={{ height: `${height}px` ,color: '#FBFF4A' }}
      value={value}
      onChange={handleInput}
    />
  );
};

export default CustomTextField;
