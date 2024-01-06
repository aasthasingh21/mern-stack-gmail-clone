import React, { Suspense, useState } from 'react';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
// import Email from '../components/Email';
import { Outlet } from 'react-router-dom';
import SuspenseLoader from '../components/SuspenseLoader';
import { Box } from '@mui/material';


const Home = () => {
  const [openDrawer, setOpenDrawer] = useState(true) // to toggle the sidebar (here bz home is the parent for both header and sidebar component)

  const toggleDrawer = () => {
    setOpenDrawer(prevState => !prevState); // when tapped on menuicon if its open then close it, if closed open it(if true it will become false and if false it will become true)
  }
  
  return (
    <> 
      < Header toggleDrawer={toggleDrawer}/> {/* toggleDrawer is passed inside header as a prop bz the icon(Menuicon) is in the header */}
      <Box>
        < SideBar openDrawer={ openDrawer } />
        {/*< Email openDrawer={openDrawer} /> we pass opendrawer to slide/change the position of the email page */}
        {/* As Email and ViewEmail page has to be shown on the same area(basically pages has to be switched accordingly) */}
        <Suspense fallback={<SuspenseLoader />}>
          <Outlet context={{ openDrawer }}/>  {/* outlet renders the child(/type or /view) components from the parents(/emails) and since those components are imported with lazy so we make use of suspense*/}
        </Suspense>
      </Box>
      
    </>
  )
}

export default Home;
