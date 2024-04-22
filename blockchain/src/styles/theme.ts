import {createTheme} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#13C2BD'
    }
  },
  typography: {
    "fontFamily": `"Mitr", sans-serif;`,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
        }
      }
    }
  },
});

export default theme;
