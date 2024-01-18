
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog'; // is the popup for compose mail
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography'; // typography by default gives <p> tag 
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// e = basically is the value/details present in the function
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';

const dialogStyle = {
    height: "90%",
    width: "80%",
    maxWidth: "100%",  // as maxwidth/height is predefined so we have to change accordingly
    maxHeight: "100%",
    boxShadow: "none",
    borderRadius: " 10px 10px 0 0"

};

const Header = styled(Box) ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 15px',
    background: '#f2f6fc',
    fontFamily: 'Google Sans, Roboto, RobotoDraft, Helvetica, Arial, sans-serif',
    '& > p': {
        fontSize: 14,
        fontWeight: 500
    },
    cursor: 'pointer'
});

const SubjectWrapper = styled(Box)({ // (SubjectWrapper) make sure fisrt letter is capital(***)
    display: 'flex',
    flexDirection: 'column',
    padding: '15px',
    '& > div': {
        fontSize: 14,
        borderBottom: '1px solid #F5F5F5',
        marginTop: '10px'
    },
    cursor: 'pointer'
});

const Footer = styled(Box) ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 15px',
    alignItems: 'center',
    cursor: 'pointer'
});

const SentButton = styled(Button) ({
    background: '#0B57D0',
    color: '#fff',
    fontWeight: 500,
    textTransform: 'none',
    borderRadius: 18,
    width: 100
});

const ComposeMail = ({openDialog, setOpenDialog}) => { // object destructuring method to receive an element as a prop
    const [data, setData] = useState({});
    const sentEmailServices = useApi(API_URLS.saveSentEmail); // to initialise our hook(to save it in database), we need to mention the endpoint so we make an object of all the information
    const saveDraftServices = useApi(API_URLS.saveDraftEmail); // to save the draft message

    const config = {
        Host : "smtp.elasticemail.com",
        Username : "roshnisingh2111@yopmail.com", // as the code is visible can people can access the information so we make use of .env file
        Password : "958F28E00F3D69C8901544A22D88D12E0F80",
        Port: '2525',
    };

    const closeCompose = (e) => { // on close button click a function is passed 
        e.preventDefault(); // as it should go to backend so now just an event is passed prevent

        const payload = {  // is the data when type: sent
            to: data.to,
            from: 'aasthasingh552@gmail.com',
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: '',
            name: 'Aastha Singh',
            starred: false,
            type: 'drafts'
        };

        saveDraftServices.call(payload); // saveDraftServices is received from useApi which has a call function and payload is passed in that

        if(!saveDraftServices.error) { // if no error then run this
            setOpenDialog(false); // close the dialog 
            setData({});    // setData to empty for new mail to compose
        } else {

        }

        setOpenDialog(false); // as it becomes false so it closes the page
    }

    const sendMail = (e) => {
        e.preventDefault();

        if(window.Email) { // email gets attach to your window, so you have to make sure you have a window whith this
            window.Email.send({ 
                ...config, // using config using spread operator
                To : data.to,
                From : "aasthasingh552@gmail.com",
                Subject : data.subject,  // is the names given in data
                Body : data.body,
            }).then(
                message => alert(message)
            );
        };

        const payload = {  // is the data when type: sent
            to: data.to,
            from: 'aasthasingh552@gmail.com',
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: '',
            name: 'Aastha Singh',
            starred: false,
            type: 'sent'
        };

        sentEmailServices.call(payload); // sentEmailServices is received from useApi which has a call function and payload is passed in that

        if(!sentEmailServices.error) { // if no error then run this
            setOpenDialog(false); // close the dialog 
            setData({});    // setData to empty for new mail to compose
        } else {

        }

        setOpenDialog(false);
    };

    const onValueChange = (e) => {
        setData({...data, [e.target.name]: e.target.value}); // is stored in the setData, data is used here and its information is get by e.target.name = becomes the key and is a variable so it has to be wrapped in a []
    }

  return (
        <Dialog
            open={openDialog} // dialog have its own props just like sidebar // openDialog is triggered here
            PaperProps={{sx: dialogStyle}}  // paperprops handle all the css
        >
            <Header>
                <Typography>New Message</Typography>
                <CloseIcon fontSize='small' onClick={(e) => {closeCompose(e)}}/> {/* when clicked on the icon closeCompose function is passed/triggered */}
            </Header>

            <SubjectWrapper>
                <InputBase placeholder='To' name='to' onChange={(e) => {onValueChange(e)}}/> {/* when something is chenged(typed) onValueChnage function is called, as same function is triggered by to,subject,body so to differentiate between then name is applied */}
                <InputBase placeholder='Subject' name='subject' onChange={(e) => {onValueChange(e)}}/> {/* when something is chenged(typed) onValueChnage function is called */}
            </SubjectWrapper>

            <TextField
                multiline // is a textfield prop which signifies can use multiple lines
                rows={20} // rows= defines max number of rows in the textfield
                sx={{'& .MuiOutlinedInput-notchedOutline': {border: 'none'}}} // allows to shape/remove etc the border(get it by inspecting on the web page)
                onChange={(e) => {onValueChange(e)}} name='body'  // when something is chenged(typed) onValueChnage function is called 
            >
            </TextField>

            <Footer>
                <SentButton onClick={(e) => {sendMail(e)}} variant="contained" color='action'>Send</SentButton>
                <DeleteOutlinedIcon onClick={() => {setOpenDialog(false)}} />
            </Footer>
            
        </Dialog>
    );
};

export default ComposeMail;
