import React from 'react';
import Appbar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu'; // icons are imported as components so use use it with self closing tags
import styled from '@emotion/styled'; // change the color or any css property
import { mainLogo } from '../constants/constants';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import InputBase from '@mui/material/InputBase'; // or import { InputBase } from '@mui/material';
import { Box } from '@mui/material'; // Box in @mui is basically a div itself
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const StyledAppBar = styled(Appbar) ({ // Appbar is now stored in StyledAppBar so Appbar is replaced with StyledAppbar
    background: "#f6f8fc",
    boxShadow: "none",
    cursor: 'pointer'
});

const SearchBox = styled(Box) ({
    background: "#eaf1fb",
    marginLeft: 80,
    borderRadius: 25,
    minWidth: 720,
    maxWidth: 750,
    height: 52,
    display: 'flex', 
    alignItems: 'center', // here to get the componets in one line(horizontally align)
    justifyContent: 'space-between',
    padding: '0 20px',
    '& > div': {  // to get the input field at start as it was inn the middle bz of justifyContent(here div is the parent for input base)
        width: '100%',
        padding: '0 10px',
    }
});

const OptionBox = styled(Box) ({
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    '& > svg': {   // as all the icons are stored/saved in svg form so svg becomes the parents and all the icons its child
        marginLeft: 20
    }
});

// we make use of appbar and toolbar from material UI to get the blue header 
// as the position of header is fixed the other elements might get hideen behind it so we make it static
const Header = ({ toggleDrawer }) => { // object destructuring (to get desire value/output)
  return (
    <StyledAppBar position='static'>
        <Toolbar>
            <MenuIcon color='action' onClick={toggleDrawer} /> {/* we put color='action' to darken the menu color */}
            <img src={mainLogo} alt="Logo" style={{width: 100, marginLeft: 15}}/>
            <SearchBox>
                <SearchIcon color='action' />
                <InputBase placeholder='Search mail'/>
                <TuneIcon color='action' />
            </SearchBox>
            <OptionBox>
                <HelpOutlineOutlinedIcon color='action'/>
                <SettingsIcon color='action'/>
                <AppsIcon color='action'/>
                <AccountCircleIcon color='action'/>
            </OptionBox>
        </Toolbar>
    </StyledAppBar>
  )
}

export default Header;
