import React, { useEffect, useState } from 'react';
import { Route, RouteProps, useHistory } from 'react-router-dom';
//-------------------- Components --------------------------
import Loading from './Loading';
//-------------------- Utils --------------------------
import { useAuth } from 'contexts/auth';
import { IAdminInfo } from 'interfaces/admin';
import API from 'Api';
//----------------------------------------------------------

interface IProps extends RouteProps { }

const PrivateRoute: React.FC<IProps> = ({ children, ...rest }) => {
    const history = useHistory();
    const { auth, authDispatch } = useAuth();

    const [isLoading, setIsLoading] = useState(false);


    const checkToken = async () => {
        if (auth.isAuthenticated) {
            setIsLoading(false);
            return;
        }

        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            setIsLoading(false);
            history.push('/login');
            return;
        }

        try {
            API.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            const { data } = await API.get<IAdminInfo>('/admin/info');
            authDispatch({ type: 'LOGIN', payload: { username: data.username } });
            setIsLoading(false);
        }
        catch (error) {
            setIsLoading(false);
            history.push('/login');
        }
    }

    useEffect(() => {
        setIsLoading(true);
        checkToken();
    }, []);


    if (isLoading) return <Loading />;

    return (
        <Route
            {...rest}
            render={() => auth.isAuthenticated && children}
        />
    );
}

export default PrivateRoute;