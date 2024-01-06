
import React, { useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { API_URLS } from '../services/api.urls';
import useApi from '../hooks/useApi';
import { useEffect, } from 'react';
import { Box } from '@mui/material';
import Checkbox from '@mui/material/Checkbox'; // is used for selecting all the mails
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import styled from '@emotion/styled';
import List from '@mui/material/List'; 
// import ListItem from '@mui/material/ListItem';
import EachEmail from './EachEmail';
import NOEmails from './common/NOEmails';
import { EMPTY_TABS } from '../constants/constants';

const TopOfEmail = styled(Box) ({
  padding: '20px 10px 0 10px',
  display: 'flex',
  alignItems: 'center',
})

const Email = () => { // receiving openDrawer as prop(but now removed because we make use of oulet)

  const [selectedEmails, setselectedEmails] = useState([]); // to select all the mails if checkbox is tapped
  const [refreshScreen, setrefreshScreen] = useState(false); // refresh screen when deleted

  const { openDrawer } = useOutletContext(); 

  const { type } = useParams(); // to know the type of the url

  const getEmailService = useApi(API_URLS.getEmailFromType); // call the api as the type changes in useEffect
  const moveEmailToBinServices = useApi(API_URLS.moveEmailToBin); // call the api as the type change
  const deleteEmailsServices = useApi(API_URLS.deleteEmail); // to delete permanently

  useEffect(() => {
    getEmailService.call({}, type); // type will go as a params in useApi.jsx - api.js
  }, [type, refreshScreen]); // as refreshScreen will get new/deleted emails

  const selectAllEmails = (e) => { // e.target.value = input field ka value, e.target.checked = value from checkbox
    if(e.target.checked) {
      const emails = getEmailService?.response?.map(email => email._id); // so if checked box is true the get all emails(response = data of the emails but we just required id bz thats unique so we map it)
      setselectedEmails(emails); // put the coming data in emails and put it in useState
    } else {
      setselectedEmails([]);
    }
  };

  const deleteSelectedEmails = (e) => {
    if(type === 'bin') { // bz if mail is already in bin then delete permanent if deleted from other selections then mpve it to bin
      deleteEmailsServices.call(selectedEmails);
    } else {
      moveEmailToBinServices.call(selectedEmails);
    }
    setrefreshScreen(prevState => !prevState); // to refresh screen if state is changed
  }
  
  
  return (
    // when opendrawer is used/open/true then marginleft becomes as mentioned and when opendrawer closes/false width becomes 100%, width (100% - 250) bz otherwise it takes extra 250 as it has lost 250 after open drawer
    <Box style={openDrawer ? {marginLeft: 250, width: 'calc(100% - 250px'} : {width: '100%'}}> 
      <TopOfEmail>
        <Checkbox size='small' onChange={(e) => selectAllEmails(e)} />
        <DeleteOutlinedIcon style={{cursor: 'pointer'}} onClick={(e) => deleteSelectedEmails(e)} />
      </TopOfEmail> 

      <List>
        {/* we make use of getEmailService which uses useApi to get the mails, here we want to display the mail(response) and useApi returns (call, response, ....) so we can use that here */}
        {/* all the mails are displayed like in a list form so we make use of list */}

        { // to capture response we call response from the getEmailServices (we make sure that getEmailServices call response only if its value is not undefined)

          getEmailService?.response?.map(email => (  //getEmailService && getEmailService.response = getEmailService?.response(in latest of node.js) // each email can be render by mapping
            <EachEmail 
              key={email.id} // mongodb add an unique id for all the database saved(id) so we make use of that to get particular email
              email={email} // email is passed as a prop and is received in eachEmail
              selectedEmails={selectedEmails} // passing as a prop to link uppercheck box to each mail checkbox
              setrefreshScreen={setrefreshScreen} // to refresh the screen
              setselectedEmails={setselectedEmails} // is passed for eachcheckbox
            />
          ))

        }
      </List>

      {  // if response is empty(data is empty), since we get the data in the form of array so we can check the length if then === 0 it means its empty(response)
        getEmailService?.response?.length === 0 && 
        <NOEmails message={EMPTY_TABS[type]} /> //it takes message from empty tags by taking the type 
      }

    </Box>
  )
}

export default Email;
