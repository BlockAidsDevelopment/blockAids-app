import type {AppProps} from 'next/app'
import {Container} from '@mui/material';
import NabBar from "@/components/NabBar";
import theme from '../styles/theme';
import {ThemeProvider} from '@mui/material/styles';
import "../styles/fonts.css";
import "../styles/globals.css";
import "@near-wallet-selector/modal-ui/styles.css"

const App = ({Component, pageProps}: AppProps) => {
  return (
    <>


      <ThemeProvider theme={theme}>
        <NabBar/>
        <Container maxWidth="xl">
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </>

  )
}

export default App;
