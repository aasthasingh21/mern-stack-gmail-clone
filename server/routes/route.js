import express from 'express';
import { saveSentEmails, getEmails, moveEmailsToBin, toggleStarredEmails, deleteEmails } from '../controller/email-controller.js';

const routes = express.Router();

routes.post('/save', saveSentEmails); // to save the mail after sent

routes.get('/emails/:type', getEmails); // to get the emails by api call when tapped on the type(listitems : draft/sent etc)

routes.post('/save-draft', saveSentEmails); // since it has to be saved just like save so we use saveSentmail function

routes.post('/bin', moveEmailsToBin) // to move items to bin

routes.post('/starred', toggleStarredEmails) // to move items to starred emails

routes.delete('/delete', deleteEmails)



export default routes;