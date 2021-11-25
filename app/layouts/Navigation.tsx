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
import Brightness6Icon from '@mui/icons-material/Brightness6';

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

import DarkModeSwitch from '@/components/DarkModeSwitch';


//import { ThemeToggleMenuAction, ThemeDarkModeAction } from '../redux/theme/themeActions';
//import { LogoutAction } from '../redux/auth/authActions';
//import { useDispatch, useSelector } from 'react-redux';
//import AppState from "../redux/appState";
//import { removeLocalStorage } from '../utils/LocalStorage';
//import { AUTH_LOCAL_STORAGE } from '../core/Constants';

/*
.header::-webkit-scrollbar{width:6px;background-color:#54B689}.header::-webkit-scrollbar-thumb{background-color:rgba(0,0,0,0.2);*/
const useStyles = makeStyles(() => ({
    root: {
        "& p": {
            textAlign: "center"
        }
    },
    
    drawerPaper: {
        backgroundColor: '#202020',
        whiteSpace: 'break-spaces',
        width: 280,
        overflowX: "hidden",
        padding: "10px 15px",
        "&>*": {
            paddingTop: "10px",
            paddingBottom: "10px"
        }
    },
    profileSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "&>*": {
            paddingBottom: "20px"
        }
    },
    avatar: {
        width: "70%",
        borderRadius: "100%"
    },
    socialMedia: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 0,
        padding: 0,
        "& li": {
            listStyle: "none"
        }
    },
    menu: {
        margin: 0
    }
   
}));


  

interface INavigation {
    //classes: any;
}

const Navigation = (props: INavigation): React.ReactElement => {

    const classes = useStyles();



    const handleNavigationButton = (link: string) => {
        //console.log("link", link);
        //history.push(`/${link}`);
    }

    

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

                <Divider  />

                <List className={classes.menu}>
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

                <DarkModeSwitch />

                </Drawer>
        </nav>
    );
}

export default Navigation;