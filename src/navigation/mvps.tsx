import React from 'react';
//-------------------- Components --------------------------
import Container from './Container';
import Content from './Content';
import PrivateRoute from 'components/PrivateRoute';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import EditMvp from 'pages/Mvps/edit';
import CreateMvp from 'pages/Mvps/create';
import Mvps from 'pages/Mvps';
//----------------------------------------------------------

const BASE_URL = '/dashboard/mvps';

const MvpsNavigation = () => {
    return (
        <>
            <PrivateRoute path={`${BASE_URL}/:id/editar`} exact>
                <Container>
                    <Sidebar />
                    <Content>
                        <Header />
                        <EditMvp />
                    </Content>
                </Container>
            </PrivateRoute>
            <PrivateRoute path={`${BASE_URL}/criar`} exact>
                <Container>
                    <Sidebar />
                    <Content>
                        <Header />
                        <CreateMvp />
                    </Content>
                </Container>
            </PrivateRoute>
            <PrivateRoute path={`${BASE_URL}`} exact>
                <Container>
                    <Sidebar />
                    <Content>
                        <Header />
                        <Mvps />
                    </Content>
                </Container>
            </PrivateRoute>
        </>
    )
}

export default MvpsNavigation;