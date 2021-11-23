import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
  }

export const Button: React.FC<ButtonProps> = ({ text, ...props }) => {

    return (
        <button {...props}>{text}</button>
    )
}
