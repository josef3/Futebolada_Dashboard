import React, { createContext, Dispatch, Reducer, useContext, useReducer } from 'react';

interface Actions {
    type: 'TOGGLE_THEME' | 'SET_THEME';
    payload?: {
        colorMode: 'light' | 'dark'
    }
}

interface ThemeProps {
    darkMode: boolean;
}

interface InitContextProps {
    theme: ThemeProps;
    themeDispatch: Dispatch<Actions>;
}

const initialState: ThemeProps = {
    darkMode: false,
}

export const ThemeContext = createContext({} as InitContextProps);

export const themeReducer: Reducer<ThemeProps, Actions> = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_THEME':
            localStorage.setItem('color-mode', state.darkMode ? 'light' : 'dark');
            return {
                ...state,
                darkMode: state.darkMode ? false : true
            }
        case 'SET_THEME':
            localStorage.setItem('color-mode', String(action.payload?.colorMode));
            return {
                ...state,
                darkMode: action.payload?.colorMode === 'dark'
            }
        default:
            return state
    }
}

export const ThemeContextProvider: React.FC = ({ children }) => {
    const [theme, themeDispatch] = useReducer(themeReducer, initialState);

    return (
        <ThemeContext.Provider value={{ theme, themeDispatch }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);