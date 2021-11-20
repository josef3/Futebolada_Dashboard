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
    // flexGrow: 1
    width: '100%',
}));

export default Content;