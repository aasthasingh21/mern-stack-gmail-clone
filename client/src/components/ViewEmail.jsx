

import React from 'react';
import { useOutletContext, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { emptyProfilePic } from '../constants/constants';
import styled from '@emotion/styled';
import { API_URLS } from '../services/api.urls';
import useApi from '../hooks/useApi';

const IconWrapper = styled(Box) ({
  padding: 15,
  cursor: 'pointer'
});

const SubjectWrapper = styled(Typography) ({
  fontSize: '22px',
  margin: '10px 0px 20px 75px',
  display: 'flex'
});

const Indicator = styled(Box) ({
  fontSize: '12px !important', // important otherwise it inherit from parent(fontsize=14 of wrapper)
  background: "#ddd",
  color: "#222",
  padding: '2px 4px',
  borderRadius: '4px',
  marginLeft: '6px',
  alignSelf: 'center'
});

const Container = styled(Box) ({
  marginLeft: 15,
  width: '100%',
  '& > div': {
    display: 'flex',
    width: '100%',
    '& > p > span': {
      fontSize: 12,
      color: '#5e5e5e'
    }
  }
});


const Date = styled(Box) ({
  margin: '0 50px 0 auto !important',
  color: '#5e5e5e',

});

const Image = styled('img') ({
  borderRadius: '50%',
  width: 40,
  height: 40,
  margin: '5px 10px 0 10px',
  background: '#cccccc'
})



const ViewEmail = () => {
    
    const { openDrawer } = useOutletContext(); // at place of normally passing opendrawer we make use of outlet just like Email.jsx

    const { state } = useLocation(); //  get state by useLocation, now state has email (which is the data to be shown) 
    // const newState = state;
    // const email =  newState?.email; // so by object destructuring we get email from state (as I was getting error)
    const email =  state?.email;

    const moveEmailToBinServices = useApi(API_URLS.moveEmailToBin); //to move the emails to bin
 
    const deleteEmails = () => {
      moveEmailToBinServices.call([email._id]); // delete with email._id
      window.history.back();
    }

  return (
    <Box style={openDrawer ? {marginLeft: 250} : {width: '100%'}}>
      <IconWrapper>
        <ArrowBackIcon onClick={() => window.history.back()} color='action' fontSize='small'/> {/* window.history.back is a window ka function which takes you back by tracking history of your device  */}
        <DeleteIcon color='action' fontSize='small' style={{ marginLeft: 40}} onClick={() => deleteEmails()}/>
      </IconWrapper>

      <SubjectWrapper>
        { email.subject } <Indicator component="span">Inbox</Indicator>
      </SubjectWrapper>

      <Box style={{ display: 'flex' }}>
        <Image src={emptyProfilePic} alt="Profile image" />

        <Container>
          <Box>
            <Typography style={{ marginTop: '10px' }}>{ email.name } 
              <Box component="span">&nbsp;&#60;{ email.to }&#62;</Box> {/* we took span as html gets element to next line but span comes inline (&#60; and &#62; gives<>, &nbsp; gives space of html(its codes for html tags cant write directly bxz it throws error))*/}
            </Typography>
            <Date>
              {(new window.Date(email.date)).getDate()}&nbsp; {/* we have the date and we display using .getdate(mongodb function) (since we dont want the whole date)*/}
              {(new window.Date(email.date)).toLocaleString('default', {month: 'long'})}&nbsp;
              {(new window.Date(email.date)).getFullYear()} 
            </Date>
          </Box>  
          <Typography style={{ marginTop: 20 }}>{ email.body }</Typography> 
        </Container>

      </Box>
    </Box>
  )
}

export default ViewEmail;
