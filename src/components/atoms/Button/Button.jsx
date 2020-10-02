import React from 'react'
import { StyledComponents } from './Button.styled'

const Input = ({ value, onClick, id }, props) => {
    return (
        <StyledComponents
            id={id}
            onClick={onClick}
        >
            {value}
        </StyledComponents>
    )
}

export default Input;