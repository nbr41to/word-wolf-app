import React from 'react'
import { StyledComponents } from './Input.styled'

const Input = ({ value, type, placeholder, maxLength, onChange }) => {
    return (
        <StyledComponents
            value={value}
            type={type}
            maxLength={maxLength}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}

export default Input;