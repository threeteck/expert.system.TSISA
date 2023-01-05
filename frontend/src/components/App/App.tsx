import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ConnectionContextProvider } from '../../client';
import { Navigator } from '../Navigator';
import { EntriesPage } from '../EntriesPage';
import { VariablesPage } from '../VariablesPage';
import { DiagnosesPage } from '../DiagnosesPage';
import { VariableAddPage } from '../VariableAddPage';
import { DiagnosesAddPage } from '../DiagnosesAddPage';
import { EntryAddPage } from '../EntryAddPage';
import { EntryViewPage } from '../EntryViewPage';
import { RulesPage } from '../RulesPage';
import { RuleViewPage } from '../RuleViewPage';
import { RuleAddPage } from '../RuleAddPage';
import { Home } from '../Home';

let theme = createTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiSelect: {
      styleOverrides: {
        select: {
          textAlign: 'left',
        }
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#081627',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          margin: '0 16px',
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up('md')]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(255,255,255,0.15)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected:focus': {
            backgroundColor: 'rgba(0, 155, 229, 0.08)!important',
          },
          '&.Mui-selected': {
            color: '#4fc3f7',
          }
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
          '& svg': {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};

const queryClient = new QueryClient()
const navigatorWindow = 256;

function App() {
  return (
    <ConnectionContextProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Navigator sx={{
              width: navigatorWindow,
              [`& .MuiDrawer-paper`]: { width: navigatorWindow, boxSizing: 'border-box', height:'100%' }
            }} />
            <div className="App" style={{ marginLeft: navigatorWindow }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/entries" element={<EntriesPage />} />
                <Route path="/entries/:id" element={<EntryViewPage />} />
                <Route path="/entries/add" element={<EntryAddPage />} />
                <Route path="/variables" element={<VariablesPage />} />
                <Route path="/variables/:id" element={<h1>Variable</h1>} />
                <Route path="/variables/add" element={<VariableAddPage />} />
                <Route path="/diagnoses" element={<DiagnosesPage />} />
                <Route path="/diagnoses/:id" element={<h1>Diagnosis</h1>} />
                <Route path="/diagnoses/add" element={<DiagnosesAddPage />} />
                <Route path="/rules" element={<RulesPage />} />
                <Route path="/rules/:id" element={<RuleViewPage />} />
                <Route path="/rules/add" element={<RuleAddPage />} />
                <Route path="*" element={<h1>404</h1>} />
              </Routes>
            </div>
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </ConnectionContextProvider>
  );
}

export default App;
