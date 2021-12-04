import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
//-------------------- MUI --------------------------
import { styled } from '@mui/system';
import { Stack, Container, Typography, } from '@mui/material';
//-------------------- Components --------------------------
import LoginForm from 'components/LoginForm';
import ReadOnlyAlert from 'components/ReadOnlyAlert';
import Loading from 'components/Loading';
//-------------------- Utils --------------------------
import { useAuth } from 'contexts/auth';
import API from 'Api';
import { IAdminInfo } from 'interfaces/admin';
//----------------------------------------------------------

const Login = () => {
    const history = useHistory();
    const { auth, authDispatch } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const checkToken = async () => {
        if (auth.isAuthenticated) {
            setIsLoading(false);
            history.push('/dashboard/jogadores');
        }

        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            setIsLoading(false);
            return;
        }

        try {
            API.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            const { data } = await API.get<IAdminInfo>('/admin/info');
            authDispatch({ type: 'LOGIN', payload: { username: data.username } });
            setIsLoading(false);
            history.push('/dashboard/jogadores');
        }
        catch (error) {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        checkToken();
    }, []);

    if (isLoading) return <Loading />;

    return (
        <Container maxWidth='sm'>
            <header style={{ textAlign: 'center', padding: '1rem 0' }}>
                <Typography variant='h3'>⚽</Typography>
            </header>

            <ContentStyle>
                <Stack sx={{ mb: 5, textAlign: 'center' }}>
                    <Typography variant='h4' gutterBottom>Dashboard Futebolada</Typography>
                </Stack>

                <ReadOnlyAlert />

                <LoginForm />
            </ContentStyle>
        </Container>
    );
}

// ---------------------- Styles ------------------------------------------

export const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 400,
    margin: 'auto',
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
        justifyContent: 'normal',
    },
    padding: theme.spacing(8, 0, 4, 0)
}));


export default Login;