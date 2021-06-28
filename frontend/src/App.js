import React from 'react';
import './App.css';
import MainGrid from './components/MainGrid';
import Navbar from './components/Navbar';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const appTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#00aa5b',
      main: '#00aa5b',
      dark: '#00aa5b',
      contrastText: '#fff',
    },
    secondary: {
      light: '#00aa5b',
      main: '#00aa5b',
      dark: '#00aa5b',
      contrastText: '#000',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <div className="App">
        <Navbar />
        <MainGrid />
      </div>
    </ThemeProvider>
  );
}

export default App;
