import React from 'react';
//-------------------- Components --------------------------
import Container from './Container';
import Content from './Content';
import PrivateRoute from '../components/PrivateRoute';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
// import BestFiveVotes from '../pages/BestFiveVotes';
//----------------------------------------------------------

const BASE_URL = '/dashboard/votos/melhores-5';

const BestFivesNavigation: React.FC = () => {
    return (
        <>
            <PrivateRoute path={`${BASE_URL}`} exact>
                <Container>
                    <Sidebar />
                    <Content>
                        <Header />
                        {/* <BestFiveVotes /> */}
                    </Content>
                </Container>
            </PrivateRoute>
        </>
    )
}

export default BestFivesNavigation;