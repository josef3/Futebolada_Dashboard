import React from 'react';
//-------------------- Components --------------------------
import Container from './Container';
import Content from './Content';
import PrivateRoute from '../components/PrivateRoute';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
// import EditWeek from '../pages/Weeks/edit';
// import CreateWeek from '../pages/Weeks/create';
import Weeks from '../pages/Weeks';
//----------------------------------------------------------

const BASE_URL = '/dashboard/semanas';

const WeeksNavigation: React.FC = () => {
    return (
        <>
            <PrivateRoute path={`${BASE_URL}/:id/editar`} exact>
                <Container>
                    <Sidebar />
                    <Content>
                        <Header />
                        {/* <EditWeek /> */}
                    </Content>
                </Container>
            </PrivateRoute>
            <PrivateRoute path={`${BASE_URL}/criar`} exact>
                <Container>
                    <Sidebar />
                    <Content>
                        <Header />
                        {/* <CreateWeek /> */}
                    </Content>
                </Container>
            </PrivateRoute>
            <PrivateRoute path={`${BASE_URL}`} exact>
                <Container>
                    <Sidebar />
                    <Content>
                        <Header />
                        <Weeks />
                    </Content>
                </Container>
            </PrivateRoute>
        </>
    )
}

export default WeeksNavigation;