import React, { createContext, Dispatch, Reducer, useContext, useReducer } from 'react';
import API from '../Api';

interface Actions {
    type: 'LOGIN' | 'LOGOUT';
    payload?: {
        accessToken?: string;
        username?: string;
    }
}

interface AuthProps {
    isAuthenticated: boolean;
    username: string;
}

interface InitContextProps {
    auth: AuthProps;
    authDispatch: Dispatch<Actions>;
}

const initialState: AuthProps = {
    isAuthenticated: false,
    username: '',
}

export const AuthContext = createContext({} as InitContextProps);

const reducer: Reducer<AuthProps, Actions> = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            if (action.payload?.accessToken) {
                API.defaults.headers.common["Authorization"] = `Bearer ${action.payload.accessToken}`;
                localStorage.setItem('accessToken', action.payload?.accessToken);
            }
            return {
                ...state,
                isAuthenticated: true,
                username: String(action.payload?.username)
            };
        case 'LOGOUT':
            delete API.defaults.headers.common['Authorization'];
            localStorage.removeItem('accessToken');
            return {
                ...state,
                ...initialState
            };
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
};

export const AuthContextProvider: React.FC = ({ children }) => {
    const [auth, authDispatch] = useReducer(reducer, initialState);

    return (
        <AuthContext.Provider value={{ auth, authDispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
