
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import styled from '@emotion/styled';
import SIDEBAR_DATA from '../config/sidebar.config';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ComposeMail from './ComposeMail';
// To get the url to select the components : 1 : params(/..) , 2 : query(?...)
import { useParams, NavLink } from 'react-router-dom'; // navlink is used to link components with particular route
import routes from '../routes/routes';

const ComposeButton = styled(Button) ({
    background: '#c2e7ff',
    color: '#001d35',
    padding: 16,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 16,
    minWidth: 140,
    textTransform: 'none',
    display: 'flex',
    justifyContent: 'space-between'
});

const Container = styled(Box) ({
    padding: 8,
    '& > ul': {
        padding: '10px 0 0 5px',
        fontSize: 14,
        fontWeight: 500,
        cursor: 'pointer',
        '& > a': {  // navlink gives anchor tag which disrupts the styling so we choose, container > ul(list) > a(navlink)
            textDecoration: 'none', // underline is removed
            color: 'inherit', // take/inherit the color from parent
        }
    },
    '& > ul > a > li > svg': {
        marginRight: 30
    }
});

const SideBarContent = () => {
    const [openDialog, setOpenDialog] = useState(false); // initially its not visible/hidden

    const { type } = useParams(); // type: is the name given in the url

    const onComposeClick = () => {
        setOpenDialog(true); // when compose button is clicked a function is passed which allows the Dialog to open/true
    }

  return (
    <Container>
        <ComposeButton variant="contained" color='action' onClick={() => {onComposeClick()}}>
            <CreateOutlinedIcon />Compose
        </ComposeButton>
        <List> {/* we show all the elements here in form of lists and @mui has lists(list and listitem which basically gives ul and li) */}
            {
                SIDEBAR_DATA.map(data => ( // sidebar data is in the form of all so we make use of mapping(while using mapping we need to provide an unique key to each components)
                    <NavLink key={data.name} to={`${routes.emails.path}/${data.name}`}> {/* navlink is used to navigate listitems to routes, works just like navigate(here is navigated to all the routes and if matched with the key) */}
                        <ListItem style={type === data.name.toLowerCase() ? { //we match the type(url) with the data.name(name is used as key here) in the list if they match then change the style, if not then keep it empty {}
                            backgroundColor: '#d3e3fd',
                            borderRadius: '0 16px 16px 0',
                        } : {} }> 
                            <data.icon fontSize='small' /> {data.title} {/* we select(map) the and show with their title from the array, icon is shown as a component so with self closing tags, fontsize runs as a prop and used to increase/decrease the size*/}
                        </ListItem> 
                    </NavLink>
                ))
            }
        </List>

        <ComposeMail openDialog={openDialog} setOpenDialog={setOpenDialog} /> {/* openDialog is passed as a prop */}
        
    </Container>
  )
}

export default SideBarContent;
