import styled from 'styled-components'

export const StyledComponents = styled.div`
    header, footer {
        background-color: navy;
        padding: 5px;
        color: white;
        small {
            display: block;
            text-align: center;
        }
        svg {
            font-size: 2.2rem;
            margin-left: 10px;
        }
    }
    header {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    main {
        padding: 16px;
    }
`