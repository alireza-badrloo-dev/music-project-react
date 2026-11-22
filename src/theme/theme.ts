
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',

    primary: {
      main: '#7134C4',
      dark: '#4C199C',
      light: '#A66BEB',
    },

    secondary: {
      main: '#AD2474',
    },

    background: {
      default: '#020209',
      paper: '#090B12',
    },

    text: {
      primary: '#DEDDE3',
      secondary: '#787081',
    },

    divider: '#313034',
  },

  shape: {
    borderRadius: 12,
  },

  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
