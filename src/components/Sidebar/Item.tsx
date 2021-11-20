import React from 'react';
import { Link, useLocation } from 'react-router-dom';
//-------------------- MUI --------------------------
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import { styled } from '@mui/material/styles';
//----------------------------------------------------------

interface Props {
    title: string;
    path: string;
    icon: JSX.Element;
    isOpen?: boolean;
}

const Item: React.FC<Props> = ({ title, path, icon, isOpen = true }) => {
    const location = useLocation();

    const isActive = location.pathname === path;

    return (
        <Tooltip
            title={title}
            disableHoverListener={isOpen}
            TransitionComponent={Zoom}
            placement='right'
        >
            <Link to={path} style={{ color: 'inherit', textDecoration: 'none' }}>
                <Content
                    sx={{
                        bgcolor: isActive ? 'primary.main' : 'transparent',
                        color: isActive ? '#fff' : 'inherit',
                        '&:hover': {
                            bgcolor: 'primary.light',
                        },
                    }}
                >
                    {icon}
                    {isOpen && <Typography sx={{ ml: '1rem' }}>{title}</Typography>}
                </Content>
            </Link>
        </Tooltip >
    )
}

//-------------------- Styles --------------------------

const Content = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
    cursor: 'pointer',
    padding: '.75rem 1rem',
    borderRadius: theme.shape.borderRadius
}));

export default Item;