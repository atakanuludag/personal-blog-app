import React from 'react';
import clsx from 'clsx';
import { ThemeProvider, makeStyles } from '@mui/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Box from '@mui/material/Box';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import HotDealIcon from '@mui/icons-material/Whatshot';
import CategoryIcon from '@mui/icons-material/Category';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { Theme } from '@mui/material';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

//import { ThemeToggleMenuAction, ThemeDarkModeAction } from '../redux/theme/themeActions';
//import { LogoutAction } from '../redux/auth/authActions';
//import { useDispatch, useSelector } from 'react-redux';
//import AppState from "../redux/appState";
//import { removeLocalStorage } from '../utils/LocalStorage';
//import { AUTH_LOCAL_STORAGE } from '../core/Constants';

/*
.header::-webkit-scrollbar{width:6px;background-color:#54B689}.header::-webkit-scrollbar-thumb{background-color:rgba(0,0,0,0.2);*/
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        "& p": {
            textAlign: "center"
        }
    },
    drawerPaper: {
        whiteSpace: 'break-spaces',
        width: 280,
        overflowX: "hidden",
        padding: "10px 15px",
        "&::-webkit-scrollbar": {
            width:"6px",
            backgroundColor:"#1e2a3a"
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor:"rgba(255,255,255,0.05)",
            borderRadius:".5rem"
        }
    },
    profileSection: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    avatar: {
        width: "70%",
        borderRadius: "100%"
    },
    socialMedia: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 0,
        padding: 0,
        "& li": {
            listStyle: "none"
        }
    }
   
}));

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));
  

interface INavigation {
    //classes: any;
}

const Navigation = (props: INavigation): React.ReactElement => {

    const classes = useStyles();

    //const history = useHistory();
    /*const dispatch = useDispatch();
    const menuOpen = useSelector((state: AppState) => state.themeReducers.menuOpen);
    const darkMode = useSelector((state: AppState) => state.themeReducers.darkMode);
    const routerTitle = useSelector((state: AppState) => state.themeReducers.routerTitle);*/
const menuOpen = true;

    const handleNavigationButton = (link: string) => {
        //console.log("link", link);
        //history.push(`/${link}`);
    }

    const [userMenuAnchorEl, setUserMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleUserMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setUserMenuAnchorEl(event.currentTarget);
    };
    
    const handleUserMenuClose = () => {
        setUserMenuAnchorEl(null);
    };

    const logout = () => {
        /*dispatch(LogoutAction());
        removeLocalStorage(AUTH_LOCAL_STORAGE);*/
        //history.push(`/login`);
    };


    return (
        <nav>
        <Drawer
                variant="permanent"
                classes={{
                    root: classes.root,
                    paper: classes.drawerPaper
                }}
            >

                <div className={classes.profileSection}>
                    <Typography variant="h5" component="h1">
                        Atakan Yasin Uludağ
                    </Typography>
                    <img className={classes.avatar} src="https://www.atakanuludag.com/wp-content/uploads/2019/09/avatar.jpg" alt="Atakan Yasin Uludağ" />
                    <Typography variant="caption" component="p">
                        İstanbul’da doğdum ve senelerdir İstanbul’da yaşıyorum. Aslen Erzincanlıyım. Zaman zaman başka şehirlere ve ülkelere turistik gezilerim oldu ancak döndüm dolaştım yine aynı yere geldim. Yeni yerler görmeyi ve farklı ülkelere gitmeyi çok seviyorum. 
                    </Typography>

                    <Box component="ul" className={classes.socialMedia}>
                        <li>
                            <Link href="#">
                                <Tooltip title="Twitter">
                                    <TwitterIcon color="action" />
                                </Tooltip>
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <Tooltip title="Instagram">
                                    <InstagramIcon color="action" />
                                </Tooltip>
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <Tooltip title="Twitter">
                                    <GitHubIcon color="action" />
                                </Tooltip>
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <Tooltip title="Linkedin">
                                    <LinkedInIcon color="action" />
                                </Tooltip>
                            </Link>
                        </li>
                    </Box>

                        

                       
                </div>

                <Divider />

                <List>
                    <ListItem button onClick={() => handleNavigationButton("dashboard")}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Hakkımda" />
                    </ListItem>

                    <ListItem button onClick={() => handleNavigationButton("users")}>
                        <ListItemIcon>
                            <EmailIcon />
                        </ListItemIcon>
                        <ListItemText primary="İletişim" />
                    </ListItem>
                </List>

                <Divider />

                <FormControlLabel
                    control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
                    label="MUI switch"
                />

                </Drawer>
        </nav>
    );
}

export default Navigation;