
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import List from "./List";
import Switch from '@mui/material/Switch';
import clsx from "clsx";
import FiestaButton from "./FiestaButton";


const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    const [partyMode, setPartyMode] = React.useState(false);
    const [colorIndex, setColorIndex] = React.useState(0);
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']; // Colores del arco iris
    //const colors = ['#bea8d5', '#a789c3', '#8960a5', '#754291','#592673', '#43155a', '#220532']; // Colores mismo tono: violeta

    React.useEffect(() => {
        if (partyMode) {
            const interval = setInterval(() => {
                setColorIndex((colorIndex + 1) % colors.length);
            }, 15); // Cambia el color cada microsegundo
            return () => clearInterval(interval);
        }
    }, [partyMode, colorIndex, colors.length]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100vw', // ancho completo
                height: '100vh', // altura completa
                alignItems: 'center',
                justifyContent: 'space-between',
                bgcolor: partyMode ? colors[colorIndex] : 'background.default',
                color: 'text.primary',
                borderRadius: 1,
            }}
        >
            <div style={{alignSelf: 'flex-end', padding: 20}} className="no-tailwind">
                {theme.palette.mode} mode
                <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                <FiestaButton partyMode={partyMode} setPartyMode={setPartyMode} />

            </div>
            <List/>
        </Box>
    );
}

export default function ToggleColorMode() {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <MyApp />
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}