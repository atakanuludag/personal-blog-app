import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { makeStyles } from '@mui/styles';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { trTR } from '@mui/material/locale';
import Container from '@mui/material/Container';
import { Navigation, Footer } from '@/layouts';

//import { AppContext, IAppContextProps } from "../context/AppContext";
//import MenuBar from '../components/MenuBar';

interface ITheme {
  children: React.ReactNode;
}

const useStyles = makeStyles({
  '@global': {
    "*::-webkit-scrollbar": {
      width:"6px",
      backgroundColor:"#2a2a2a"
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor:"rgba(255,255,255,0.05)",
      borderRadius:".5rem"
    }
  },
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    margin: "10vh 0px"
  },
  
});


const AppTheme = ({ children }: ITheme): React.ReactElement => {
    
  //const { darkMode } = React.useContext(AppContext) as IAppContextProps;

  const theme = createTheme({
    palette: {
      mode: 'dark',
      //mode: darkMode ? 'dark' : 'light',
      primary: {
        light: '#ffcd38',
        main: '#ffc107',
        dark: '#b28704',
        contrastText: '#000',
      },
      secondary: {
        light: '#ffa733',
        main: '#ff9100',
        dark: '#b26500',
        contrastText: '#000',
      },
    },
    //font-family: 'Outfit', sans-serif;
    typography: {
      fontFamily: [
        'system-ui',
        '-apple-system',
        'Roboto',
        'sans-serif'
      ].join(','),
    },
  }, trTR);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Navigation />
        <Container maxWidth="lg">
          <CssBaseline />
          <main className={classes.content}> {children}</main>
          <Footer />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default AppTheme;