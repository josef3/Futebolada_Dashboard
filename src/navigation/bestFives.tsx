import React from 'react';
//-------------------- Components --------------------------
import Container from './Container';
import Content from './Content';
import PrivateRoute from '../components/PrivateRoute';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
// import EditBestFive from '../pages/BestFives/edit';
// import CreateBestFive from '../pages/BestFives/create';
import BestFives from '../pages/BestFives';
//----------------------------------------------------------

const BASE_URL = '/dashboard/melhores-5';

const BestFivesNavigation: React.FC = () => {
    return (
        <>
            <PrivateRoute path={`${BASE_URL}/:id/editar`} exact>
                <Container>
                    <Sidebar />
                    <Content>
                        <Header />
                        {/* <EditBestFive /> */}
                    </Content>
                </Container>
            </PrivateRoute>
            <PrivateRoute path={`${BASE_URL}/criar`} exact>
                <Container>
                    <Sidebar />
                    <Content>
                        <Header />
                        {/* <CreateBestFive /> */}
                    </Content>
                </Container>
            </PrivateRoute>
            <PrivateRoute path={`${BASE_URL}`} exact>
                <Container>
                    <Sidebar />
                    <Content>
                        <Header />
                        <BestFives />
                    </Content>
                </Container>
            </PrivateRoute>
        </>
    )
}

export default BestFivesNavigation;