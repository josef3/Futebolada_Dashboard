import React from 'react';
import { styled } from '@mui/system';
//----------------------------------------------------------

const Container: React.FC = ({ children }) => {
    return (
        <ContainerDiv>
            {children}
        </ContainerDiv>
    )
}

//-------------------- Styles --------------------------

const ContainerDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    minHeight: '100vh',
    flex: 1
}));

export default Container;