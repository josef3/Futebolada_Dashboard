import React from 'react';
//-------------------- Components --------------------------
import Container from './Container';
import Content from './Content';
import PrivateRoute from '../components/PrivateRoute';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import MvpVotes from '../pages/MvpVotes';
//----------------------------------------------------------

const BASE_URL = '/dashboard/votos/mvp';

const BestFivesNavigation: React.FC = () => {
    return (
        <>
            <PrivateRoute path={`${BASE_URL}`} exact>
                <Container>
                    <Sidebar />
                    <Content>
                        <Header />
                        <MvpVotes />
                    </Content>
                </Container>
            </PrivateRoute>
        </>
    )
}

export default BestFivesNavigation;