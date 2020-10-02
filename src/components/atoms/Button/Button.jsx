import React from 'react'
import { StyledComponents } from './Button.styled'

const Input = ({ value, onClick }) => {
    return (
        <StyledComponents
            onClick={onClick}
        >
            {value}
        </StyledComponents>
    )
}

export default Input;