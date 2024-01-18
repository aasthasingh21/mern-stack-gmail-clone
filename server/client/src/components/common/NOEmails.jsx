
import React from 'react';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider'; // the Hr tag in html

const Component = styled(Box) ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginTop: 50,
  opacity: '0.8',
  width: '100%'
});

const StyleDivider = styled(Divider) ({
  width: '100%',
  marginTop: 10
});

const NOEmails = ({ message }) => {
  return (
    <Component>
      <Typography>{message.heading}</Typography>
      <Typography>{message.subHeading}</Typography>
      <StyleDivider />
    </Component>
  )
}

export default NOEmails;
