import React from 'react';
//-------------------- Components --------------------------
import Container from './Container';
import Content from './Content';
import PrivateRoute from '../components/PrivateRoute';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
// import EditPlayer from '../pages/Players/edit';
// import CreatePlayer from '../pages/Players/create';
import Players from '../pages/Players';
//----------------------------------------------------------

const BASE_URL = '/dashboard/jogadores';

const PlayersNavigation: React.FC = () => {
    return (
        <>
            <PrivateRoute path={`${BASE_URL}/:id/editar`} exact>
                <Container>
                    <Sidebar />
                    <Content>
                        <Header />
                        {/* <EditPlayer /> */}
                    </Content>
                </Container>
            </PrivateRoute>
            <PrivateRoute path={`${BASE_URL}/criar`} exact>
                <Container>
                    <Sidebar />
                    <Content>
                        <Header />
                        {/* <CreatePlayer /> */}
                    </Content>
                </Container>
            </PrivateRoute>
            <PrivateRoute path={`${BASE_URL}`} exact>
                <Container>
                    <Sidebar />
                    <Content>
                        <Header />
                        <Players />
                    </Content>
                </Container>
            </PrivateRoute>
        </>
    )
}

export default PlayersNavigation;