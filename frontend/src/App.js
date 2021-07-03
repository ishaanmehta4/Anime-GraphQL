import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import MainGrid from './components/MainGrid';
import Footer from './components/Footer';

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
        <h3 class="mobile_error">Come back on a PC later to try out the queries.</h3>
        <MainGrid />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
