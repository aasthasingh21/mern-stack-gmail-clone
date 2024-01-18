
// to handle the error 

import React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useRouteError } from 'react-router-dom'; // is a custom hooks to know what the error is 

const ErrorComponents = () => {
    const error = useRouteError(); // for the developers to know the errors for debugging
    console.log(error);

    return (
        <Box style={{ marginLeft: 250 }}> 
            <Typography>There was an Error</Typography> {/* This error is for the client */}
        </Box>
    )
}

export default ErrorComponents;
