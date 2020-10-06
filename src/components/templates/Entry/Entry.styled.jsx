import styled from 'styled-components'

export const StyledComponents = styled.div`
    width: 50%;
    border-radius: 10px;
    background-color: ${props => props.color};
    padding: 10px;
    margin: 12px 4px;
    text-align: center;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    h2 {
        font-size: 1.2rem;
        text-align: center;
    }
    p {
        padding: 8px 0;
        text-align: left;
    }
`