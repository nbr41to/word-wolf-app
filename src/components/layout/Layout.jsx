import React from 'react'
import { StyledComponents } from './Layout.styled'

import PetsIcon from '@material-ui/icons/Pets';

const Layout = ({ children }) => {
    return (
        <StyledComponents>
            <header>
                <h1>Online Word Wolf</h1>
                <PetsIcon />
            </header>
            <main>
                {children}
            </main>
            <footer>
                <small>Copyright 2020 @tivehack</small>
            </footer>
        </StyledComponents>
    )
}

export default Layout;