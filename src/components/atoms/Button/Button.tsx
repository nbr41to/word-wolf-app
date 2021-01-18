import React from 'react'
import styled from 'styled-components'

export type ButtonProps = {
  className?: string
  onClick: () => void
  label: string
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  className = '',
  label,
  onClick,
  disabled = false,
}) => {
  return (
    <StyledButton
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </StyledButton>
  )
}

export const StyledButton = styled.button`
  font-weight: bold;
  display: block;
  text-align: center;
  padding: 12px 32px;
  border: 3px solid #333;
  border-radius: 18px;
  box-shadow: 0px 4px 0px #333;
  position: relative;
  background-color: #fff;

  &:active {
    position: relative;
    top: 2px;
    box-shadow: 0px 2px 0px #333;
    background-color: palegreen;
  }
  &:disabled {
    opacity: 0.4;
  }
`
