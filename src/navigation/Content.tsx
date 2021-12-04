import React from 'react';
import { styled } from '@mui/system';
//----------------------------------------------------------

const Content: React.FC = ({ children }) => {
    return (
        <ContentDiv>
            {children}
        </ContentDiv>
    )
}

//-------------------- Styles --------------------------

const ContentDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    flex: 1,
    overflowX: 'hidden'
}));

export default Content;