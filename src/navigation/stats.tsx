import React from 'react';
//-------------------- Components --------------------------
import Container from './Container';
import Content from './Content';
import PrivateRoute from '../components/PrivateRoute';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
// import EditStat from '../pages/Stats/edit';
// import CreateStat from '../pages/Stats/create';
import Stats from '../pages/Stats';
//----------------------------------------------------------

const BASE_URL = '/dashboard/estatisticas';

const StatsNavigation: React.FC = () => {
    return (
        <>
            <PrivateRoute path={`${BASE_URL}/:id/editar`} exact>
                <Container>
                    <Sidebar />
                    <Content>
                        <Header />
                        {/* <EditStat /> */}
                    </Content>
                </Container>
            </PrivateRoute>
            <PrivateRoute path={`${BASE_URL}/criar`} exact>
                <Container>
                    <Sidebar />
                    <Content>
                        <Header />
                        {/* <CreateStat /> */}
                    </Content>
                </Container>
            </PrivateRoute>
            <PrivateRoute path={`${BASE_URL}`} exact>
                <Container>
                    <Sidebar />
                    <Content>
                        <Header />
                        <Stats />
                    </Content>
                </Container>
            </PrivateRoute>
        </>
    )
}

export default StatsNavigation;