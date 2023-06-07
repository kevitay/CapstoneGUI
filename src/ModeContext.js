import {createContext, useState, useMemo} from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

export const colorModeContext = createContext()

export function ColorModeProvider ({children}) {
    const [mode, setMode] = useState('light')

    const colorMode = useMemo( () => ({
        toggleColorMode: () => { setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))}
    }), [])

    const theme = useMemo( () => createTheme({
        palette: {mode}
    }), [mode])

return (
    <colorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
        <CssBaseline/>
        {children}
        </ThemeProvider>
    </colorModeContext.Provider>
)
}
