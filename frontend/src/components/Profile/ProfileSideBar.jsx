import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import ProfileCard from './ProfileCard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import { Link } from 'react-router-dom';

const drawerWidth = 199;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


const sideBarTopElements = [
  
    {
        text:"Profile",
        icon:<AccountCircleIcon/>
    },
    {
        text:"Address",
        icon:<AddLocationAltIcon/>
    },
    {
      text:"Orders",
      icon:<ShoppingBagIcon/>
    }

]


const sideBarLowerElements = [

    {
        text:"Settings",
        icon:<SettingsIcon/>
    },
    {
      text:"Customer Care",
      icon:<HeadsetMicIcon/>
  }

]



export default function ProfileSideBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  return (
    <Box sx={{ display: 'flex' ,mt:10}}>
      <CssBaseline />
     
      <Drawer variant="permanent" open={open} >
        <DrawerHeader>
          <IconButton            
           onClick={()=>setOpen(!open)}
          >

        {open ? <CloseIcon /> : <MenuIcon/>}

          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>

          {sideBarTopElements.map((bar, index) => (
            <Link to={`/${bar?.text?.toLowerCase()}`} style={{ textDecoration: 'none'}}>
            <ListItem key={bar.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {bar.icon}
                </ListItemIcon>
                <ListItemText primary={bar.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {sideBarLowerElements.map((bar, index) => (
            <Link to={`/${bar?.text?.toLowerCase()}`} style={{ textDecoration: 'none'}}>
            <ListItem key={bar.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {bar.icon}
                </ListItemIcon>
                <ListItemText primary={bar.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* <DrawerHeader />  */}

      </Box>
    </Box>
  );
}

