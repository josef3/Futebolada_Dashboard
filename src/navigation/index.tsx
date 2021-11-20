import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { SnackbarKey, SnackbarProvider } from 'notistack';
//-------------------- MUI --------------------------
import CloseIcon from '@mui/icons-material/CloseRounded';
import { IconButton } from '@mui/material';
//-------------------- Components --------------------------
import PlayersNavigation from './players';
import StatsNavigation from './stats';
import WeeksNavigation from './weeks';
import MvpsNavigation from './mvps';
import BestFivesNavigation from './bestFives';
import MvpVotesNavigation from './mvpVotes';
// import BestFiveVotesNavigation from './bestFiveVotes';
import Login from '../pages/Login';
//----------------------------------------------------------
import { AuthContextProvider } from '../contexts/auth';
import ThemeConfig from '../theme';
//----------------------------------------------------------

const Navigation: React.FC = () => {
    const notistackRef = React.createRef<any>();
    const onClickDismiss = (key: SnackbarKey) => () => notistackRef.current.closeSnackbar(key);

    return (
        <Router>
            <Switch>
                <AuthContextProvider>
                    <ThemeConfig>
                        <SnackbarProvider
                            maxSnack={3}
                            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                            ref={notistackRef}
                            action={(key) => (<IconButton onClick={onClickDismiss(key)}><CloseIcon /></IconButton>)}
                        >

                            <PlayersNavigation />
                            <WeeksNavigation />
                            <StatsNavigation />
                            <MvpsNavigation />
                            <BestFivesNavigation />
                            <MvpVotesNavigation />
                            {/* <BestFiveVotesNavigation /> */}

                            <Route path='/login' exact>
                                <Login />
                            </Route>

                            <Route path='/' exact>
                                <Redirect to='/login' />
                            </Route>

                        </SnackbarProvider>
                    </ThemeConfig>
                </AuthContextProvider>
            </Switch>
        </Router>
    )
}

export default Navigation;