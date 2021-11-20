import { useEffect } from 'react';
//-------------------- Components --------------------------
import Navigation from './navigation';
//-------------------- Utils --------------------------
import { useTheme } from './contexts/theme';
import useMediaQuery from './hooks/useMediaQuery';
//----------------------------------------------------------

function App() {
	const { themeDispatch } = useTheme();
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	//everytime the component renders, we are going to check if there's a value
	//for color mode on localStorage
	useEffect(() => {
		const colorModeStored = localStorage.getItem('color-mode');

		//valid color mode value stored in localStorage
		if (colorModeStored === 'light' || colorModeStored === 'dark') {
			themeDispatch({ type: 'SET_THEME', payload: { colorMode: colorModeStored } });
		}
		else {
			themeDispatch({ type: 'SET_THEME', payload: { colorMode: prefersDarkMode ? 'dark' : 'light' } });
		}
	}, [prefersDarkMode, themeDispatch]);

	return (
		<Navigation />
	);
}

export default App;
