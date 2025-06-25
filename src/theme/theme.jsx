import { createTheme } from '@mui/material/styles'
import { createContext, useMemo, useState } from 'react'

export const ColorModeContext = createContext({ toggleColorMode: () => {} })

export const useMode = () => {
  const [mode, setMode] = useState('light')

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    []
  )

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                background: {
                  default: '#fff',
                  paper: '#fff',
                  hover: '#f5f5f5',
                  icon: '#42A5F5',
                },
              }
            : {
                background: {
                  default: '#1e1e1e',
                  paper: '#1e1e1e',
                  hover: '#2c2c2c',
                  icon: '#42A5F5',
                },
              }),
        },
        typography: {
          fontFamily: `'Lexend', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
        },
        components: {
          MuiListItemButton: {
            styleOverrides: {
              root: {
                '&.Mui-selected': {
                  color: '#5FBB7D',
                  backgroundColor: '#F0F3F3',
                },
              },
            },
          },
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
          },
        },
      }),
    [mode]
  )

  return [theme, colorMode]
}
