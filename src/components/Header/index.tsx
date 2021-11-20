import React from 'react';
//-------------------- MUI --------------------------
import IconButton from '@mui/material/IconButton';
//-------------------- Icons --------------------------
import SunIcon from '@mui/icons-material/WbSunnyRounded';
import MoonIcon from '@mui/icons-material/Brightness2Rounded';
//-------------------- Components --------------------------
import AvatarPopover from './AvatarPopover';
import Burger from './Burger';
//-------------------- Utils --------------------------
import { useTheme } from '../../contexts/theme';
import { styled } from '@mui/system';
//----------------------------------------------------------

const Header: React.FC = () => {
    const { theme, themeDispatch } = useTheme();

    return (
        <Content>
            <Burger />

            <HeaderIcons>
                <IconButton onClick={() => themeDispatch({ type: 'TOGGLE_THEME' })}>
                    {theme.darkMode ? <SunIcon /> : <MoonIcon />}
                </IconButton>
                <AvatarPopover />
            </HeaderIcons>
        </Content >
    )
}

//-------------------- Styles --------------------------

export const Content = styled('div')(({ theme }) => ({
    display: 'flex',
    padding: '1rem 5vw',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.up('sm')]: {
        justifyContent: 'flex-end',
    },
}));

export const HeaderIcons = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
}));

export default Header;