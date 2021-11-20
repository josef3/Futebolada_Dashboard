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
                <Link to={newUrl} style={{ textDecoration: 'none' }}>
                    <Button variant='contained' size='large'>
                        <AddIcon />
                        <Typography sx={{ display: { xs: 'none', sm: 'inline-flex' } }}> {newLabel}</Typography>
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
`;

export default Header;