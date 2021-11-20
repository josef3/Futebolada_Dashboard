import React, { useEffect } from 'react';
//-------------------- MUI --------------------------
import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
//-------------------- Icons --------------------------
import CalendarIcon from '@mui/icons-material/CalendarTodayRounded';
import StatsIcon from '@mui/icons-material/EqualizerRounded';
import PersonIcon from '@mui/icons-material/PersonRounded';
import StarIcon from '@mui/icons-material/StarRounded';
import GroupsIcon from '@mui/icons-material/GroupsRounded';
//-------------------- Components --------------------------
import Item from './Item';
//-------------------- Utils --------------------------
import useToggle from '../../hooks/useToggle';
import useWindowSize from '../../hooks/useWindowSize';
//----------------------------------------------------------

export const sidebarOptions = [
    {
        title: 'Jogadores',
        path: '/dashboard/jogadores',
        icon: <PersonIcon />
    },
    {
        title: 'Semanas',
        path: '/dashboard/semanas',
        icon: <CalendarIcon />
    },
    {
        title: 'Estatísticas',
        path: '/dashboard/estatisticas',
        icon: <StatsIcon />
    },
    {
        title: 'Mvps',
        path: '/dashboard/mvps',
        icon: <StarIcon />
    },
    {
        title: 'Melhores 5',
        path: '/dashboard/melhores-5',
        icon: <GroupsIcon />
    },
    {
        title: 'Votos MVP',
        path: '/dashboard/votos/mvp',
        icon: <StarIcon />
    },
    {
        title: 'Votos Melhor 5',
        path: '/dashboard/votos/melhor-5',
        icon: <GroupsIcon />
    }
]

const Sidebar: React.FC = () => {
    const [isOpen, toggleIsOpen] = useToggle(true);
    const { width } = useWindowSize();

    //if window size width is smaller than 900 the sidebar should be closed
    useEffect(() => {
        if (width && width < 900 && isOpen) {
            toggleIsOpen();
        }
    }, [width])

    return (
        <Aside>
            <Toggler onClick={toggleIsOpen}>{isOpen ? '<' : '>'}</Toggler>
            <Typography variant='h3' m='0 auto 2rem auto'>⚽</Typography>
            {sidebarOptions.map((option) => (
                <Item key={option.title} {...option} isOpen={isOpen} />
            ))}
        </Aside>
    )
}

//-------------------- Styles --------------------------

const Aside = styled('aside')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: theme.spacing(2),
    borderRight: `1px solid ${theme.palette.divider}`,
    position: 'sticky',
    top: 0,
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    },
}));

const Toggler = styled(Paper)(({ theme }) => ({
    position: 'absolute',
    right: -20,
    top: '1.7rem',
    width: '2rem',
    height: '2rem',
    fontSize: '1.25rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
}));

export default Sidebar;