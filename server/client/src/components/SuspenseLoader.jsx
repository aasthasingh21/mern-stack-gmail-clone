
import React from 'react';
import { Box, CircularProgress } from '@mui/material'; // loader 
import Typography from '@mui/material/Typography';

const SuspenseLoader = () => {
  return (
    <Box>
        <CircularProgress />
        <Typography>Loading...</Typography>
    </Box>
    
  )
}

export default SuspenseLoader;
