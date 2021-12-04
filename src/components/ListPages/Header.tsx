import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
//-------------------- MUI --------------------------
import { Button, Typography } from '@mui/material';
//-------------------- Icons --------------------------
import AddIcon from '@mui/icons-material/AddRounded';
//----------------------------------------------------------

interface IProps {
    title: string;
    newLabel?: string;
    newUrl?: string;
}

const Header: React.FC<IProps> = ({ title, newLabel, newUrl }) => {
    return (
        <Container>
            <Typography variant='h4'>{title}</Typography>

            {newLabel && newUrl && (
                <Link to={newUrl}>
                    <Button variant='contained' sx={{ gap: 1 }}>
                        <AddIcon fontSize='small' />
                        {newLabel}
                    </Button>
                </Link>
            )}

        </Container>
    )
}

//-------------------- Styles --------------------------

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    a { 
        text-decoration: none;
    }
`;

export default Header;