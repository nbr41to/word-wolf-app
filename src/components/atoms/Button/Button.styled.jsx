import styled from 'styled-components'

export const StyledComponents = styled.button`
    width: 100%;
    height: 60px;
    display: block;
    text-align: center;
    padding: 10px 16px;
    background-color: navy;
    color: white;
    font-size: 1.0rem;
    font-weight: bold;
    border-radius: 10px;
    margin: 12px 0;
    :disabled {
        background-color: #ccc;
        border: none;
    }
`