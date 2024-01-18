
import React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom'; // to navigate to view page when clicked on the mail
import routes from '../routes/routes';
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';

const Wrapper = styled(Box) ({
    padding: '0 0 0 10px',
    background: "#f2f6fc",
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '& > div': { // as box basicallly = div
        display: 'flex',
        width: '100%', 
        '& > p': { //  typography = p
            fontSize: '14px'
        }
    }, 
    
});

const Indicator = styled(Typography) ({
    fontSize: '12px !important', // important otherwise it inherit from parent(fontsize=14 of wrapper)
    background: "#ddd",
    color: "#222",
    padding: '0 4px',
    borderRadius: '4px',
    marginRight: '6px'
});

const Date = styled(Typography) ({
    marginLeft: 'Auto', // to send to extreme left
    marginRight: 20,
    fontSize: 12,
    color: '#5f6368'
});


const EachEmail = ( {email, selectedEmails, setrefreshScreen, setselectedEmails } ) => { // object destructuring

    const navigate = useNavigate(); // to initialize navigate

    const toggleStarredService = useApi(API_URLS.taggleStarredEmail); // toggleStarredEmails is acessed in api.urls with useApi

    const toggleStarredEmail = () => {
        toggleStarredService.call({ id: email._id, value: !email.starred}); // with _id is passed in email and if the value is (!starred) then pass the req in the backend(email-controller.js)
        setrefreshScreen(prevState => !prevState); // changing the prevstate as refreshed
    };

    const onValueChange = () => {
        if(selectedEmails.includes(email._id)) { // take selectedEmails with id 
            setselectedEmails(prevState => prevState.filter(id => id != email._id)); // if id dose not match with prevstate (if selected already then unselect and vise-versa)
        } else {
            setselectedEmails(prevState => [...[prevState, email._id]]); 
        }
    }

  return (
    <Wrapper>
        <Checkbox 
            size='small'
            checked={selectedEmails?.includes(email._id)} // see if selectedEmails values is matched with the email_id, if yes/true then select it(includes is a function(mongodb))
            onChange={() => onValueChange()}
        />

        { // is already starred use this
            email.starred ? 
            <StarIcon fontSize='small' style={{marginRight: '10px', color: '#FADA5E'}} onClick={() => toggleStarredEmail()} />
            :
            <StarBorderIcon fontSize='small' style={{marginRight: '10px'}} onClick={() => toggleStarredEmail()} />
        }


        <Box onClick={() => navigate(routes.view.path, {state: { email: email }})}> {/* when clicked on mail it will navigate to routes to view and take the path, it takes another argument state: email : email to send the data of mail to viewpage */}
            <Typography style={{width: 200, overflow: 'hidden'}}>{email.name}</Typography> {/* to display who has sent the mail, overflow= incase name is big */}
            <Indicator>Inbox</Indicator>
            <Typography style={{overflow: 'hidden'}}>{email.subject} {email.body && '-'} {email.body}</Typography> {/* some mails dont have body but if then have body(&&) then put (-) and show body  */}
            <Date>
                {(new window.Date(email.date)).getDate()} {/* we have the date and we display using .getdate(mongodb function) (since we dont want the whole date)*/}
                {(new window.Date(email.date)).toLocaleString('default', {month: 'long'})} 
            </Date>
        </Box>
    </Wrapper>
  )
}

export default EachEmail;
