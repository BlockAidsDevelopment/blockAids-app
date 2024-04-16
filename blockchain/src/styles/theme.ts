import {createTheme} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
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

  },
});

export default theme;
