import AlertIcon from './AlertIcon.tsx';
import React from 'react';
import { AlertIconState } from '../../types/types.ts';

interface Props {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  inputWithIcon: boolean;
  iconState?: AlertIconState;
  iconTooltip?: string;
}

const CustomInput = ({
  type,
  value,
  onChange,
  placeholder,
  inputWithIcon,
  iconState,
  iconTooltip,
}: Props) => {
  const showIcon = inputWithIcon && iconState;

  return (
    <div className="inline-flex items-center mt-4">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="inline-block w-80 ml-12 mr-2"
      />
      {showIcon && (
        <AlertIcon
          state={iconState}
          className="w-8 h-8 mr-2 inline-block"
          tooltip={iconTooltip}
        />
      )}
    </div>
  );
};

export default CustomInput;
