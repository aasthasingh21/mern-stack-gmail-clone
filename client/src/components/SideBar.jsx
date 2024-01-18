
import React from 'react';
import Drawer from '@mui/material/Drawer';
import SideBarContent from './SideBarContent';

const SideBar = ({ openDrawer }) => {
  return (
    <Drawer 
      anchor='left' // determines the way/position
      open={openDrawer}   // triggers openDrawer in the home.jsx
      hideBackdrop={true} // so that background me everything dosen't become pale/light
      ModalProps={{
        keepMounted: true
      }}
      variant='persistent'  // makes the sidebar and main page look like on the same page(it looks same page just divided with a line)
      sx={{ // to start the it from your chice(muipaper defined in the html page is done using effects(sx))
        '& .MuiDrawer-paper': { // MuiDrawer-paper : is the name given by html page(styles)
          marginTop: '64px',
          width: 250,
          background: '#f6f8fc',
          borderRight: 'none',
          height: 'calc(100vh - 64px)'
        }
      }}
    >
      < SideBarContent />
    </Drawer>
  );
}

export default SideBar;