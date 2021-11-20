import { useMemo } from 'react';
//-------------------- MUI --------------------------
import { CssBaseline, } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
//-------------------- Utils --------------------------
import shape from './shape';
import palette from './palette';
import typography from './typography';
import { useTheme } from '../contexts/theme';
//----------------------------------------------------------

const ThemeConfig: React.FC = ({ children }) => {
    const { theme } = useTheme();

    const themeOptions = useMemo(
        () => ({
            palette: palette(theme.darkMode ? 'dark' : 'light'),
            shape,
            typography,
        }), [theme]);

    const customTheme = createTheme(themeOptions);

    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}

export default ThemeConfig;