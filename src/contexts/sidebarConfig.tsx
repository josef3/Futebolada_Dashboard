import React, { createContext, Dispatch, Reducer, useContext, useReducer } from 'react';

interface Actions {
    type: 'TOGGLE_SIDEBAR_OPEN';
}

interface SidebarConfigProps {
    sidebarIsOpen: boolean;
}

interface InitContextProps {
    sidebarConfig: SidebarConfigProps;
    sidebarConfigDispatch: Dispatch<Actions>;
}

const initialState: SidebarConfigProps = {
    sidebarIsOpen: !!localStorage.getItem('dashboard-sidebar-config') ? localStorage.getItem('dashboard-sidebar-config') === 'open' : true,
}

export const SidebarConfigContext = createContext({} as InitContextProps);

export const sidebarConfigReducer: Reducer<SidebarConfigProps, Actions> = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_SIDEBAR_OPEN':
            localStorage.setItem('dashboard-sidebar-config', state.sidebarIsOpen ? 'closed' : 'open');
            return {
                sidebarIsOpen: !state.sidebarIsOpen
            }
        default:
            return state
    }
}

export const SidebarConfigContextProvider: React.FC = ({ children }) => {
    const [sidebarConfig, sidebarConfigDispatch] = useReducer(sidebarConfigReducer, initialState);

    return (
        <SidebarConfigContext.Provider value={{ sidebarConfig, sidebarConfigDispatch }}>
            {children}
        </SidebarConfigContext.Provider>
    );
}

export const useSidebarConfig = () => useContext(SidebarConfigContext);