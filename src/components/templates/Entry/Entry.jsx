import React from 'react'
import { StyledComponents } from './Entry.styled'
import Button from '../../atoms/Button'

const Rules = ({ children, label, buttonLabel, color, onClickButton }) => {
    return (
        <StyledComponents color={color}>
            <h2>{label}</h2>
            {children}
            <Button value={buttonLabel} onClick={onClickButton} />
        </StyledComponents>
    )
}

export default Rules;