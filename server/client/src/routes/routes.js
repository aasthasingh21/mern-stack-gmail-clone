
// import Email from "../components/Email";
// import Home from "../pages/Home";
// import ViewEmail from "../components/ViewEmail";

// when it comes to big application we do not import pages directly(because when we import directly all the pages gets imported on the website which is not a good practice), 
// so we make use of lazy from react and lazy works with suspense(we have to wrap the website with suspense),
// suspense takes a prop(callback) in which we provide the loaderpage
// lazy works with components/pages which are export default; and not with just export(eg: export const fall = {})
import { lazy } from "react";

const Home = lazy( () => import('../pages/Home'));
const Email = lazy( () => import('../components/Email'));
const ViewEmail = lazy( () => import('../components/ViewEmail'));

const routes = {
    home: {
        path: '/', // is the home page(parent page and later all the type pages will be opened accordingly)
        element: Home
    },
    emails: { // is a child(1st) element but is always opened (eg: .com/emails/(inbox or bin or draft etc (type : is the 2nd child)))
        path: '/email',
        element: Email
    },
    view: { // is taken as another because its a new page(to view each mail), is also a child(2nd) but it dosent take /email page(as it )
        path: '/view',
        element: ViewEmail
    },
    invalid: {  // this becomes the child(2nd of '/emails') of '/' and '/email' after .com/emails(anything other than valid route will navigate the page to /inbox page)
        path: '/*',
        element: Email 
    }
    
}

export default routes;