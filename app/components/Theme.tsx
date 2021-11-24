import React from 'react';
import Footer from '@/components/Footer';
import CssBaseline from '@mui/material/CssBaseline';
import { makeStyles } from '@mui/styles';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { trTR } from '@mui/material/locale';
import Container from '@mui/material/Container';
import Navigation from '@/components/Navigation';

//import { AppContext, IAppContextProps } from "../context/AppContext";
//import MenuBar from '../components/MenuBar';

interface ITheme {
  children: React.ReactNode;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  }
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
        '-apple-system',
        'BlinkMacSystemFont',
        'Outfit',
        'sans-serif'
      ].join(','),
    },
  }, trTR);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Navigation />
        <Container fixed  maxWidth="lg">
          <CssBaseline />
          <main className={classes.content}> {children}</main>
          <Footer />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default AppTheme;