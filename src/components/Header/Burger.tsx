import React from 'react';
//-------------------- MUI --------------------------
import { styled } from '@mui/system';
import { Drawer, Box, Typography, IconButton, } from '@mui/material';
//-------------------- Icons --------------------------
import MenuIcon from '@mui/icons-material/MenuRounded';
//-------------------- Components --------------------------
import Item from '../Sidebar/Item';
//-------------------- Utils --------------------------
import { sidebarOptions } from '../Sidebar';
import useToggle from '../../hooks/useToggle';
//----------------------------------------------------------

const Burger: React.FC = () => {
    const [drawerOpen, toggleDrawer] = useToggle(false);

    return (
        <>
            <BurgerButton onClick={toggleDrawer}>
                <MenuIcon />
            </BurgerButton>

            <Drawer
                open={drawerOpen}
                onClose={toggleDrawer}
            >
                <Box px={5} py={4}>
                    <Typography variant='h3' mb={3}>Futeb⚽lada</Typography>

                    {sidebarOptions.map((option) => (
                        <Item key={option.title} {...option} />
                    ))}
                </Box>
            </Drawer>
        </>
    )
}

//-------------------- Styles --------------------------

const BurgerButton = styled(IconButton)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
        display: 'none'
    },
}));

export default Burger;