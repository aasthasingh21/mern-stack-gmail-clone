

import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import routes from "./routes/routes";
import ErrorComponents from './components/common/ErrorComponents';
import { Suspense } from "react"; // used with lazy to import pages
import SuspenseLoader from './components/SuspenseLoader'; // loader page

const router = createBrowserRouter(  // createBrowserRouter is used instead of BrowseRouter
  createRoutesFromElements(          // createRoutesFromElements is used instead of Router
    <Route>
      <Route path={routes.home.path} element={<Navigate to={`${routes.emails.path}/inbox`} />} /> {/* by default /inbox page is opened as it navigate the '/' to inbox page directly */}
      <Route path={routes.home.path} element={<routes.home.element />}> {/* "HERE HOME('/') is the Parent element/page" path and element is taken from routes.js file  */}
        <Route path={`${routes.emails.path}/:type`} element={<routes.emails.element />} errorElement={<ErrorComponents />}/> {/* and this becomes the child because home route='/', whatever will come will be after '/',(eg: /draft, /bin(/draft,bin are all the /type) making it as a child of '/' so we make use of `/:(after : everything is dynamic)`) */}
        <Route path={routes.view.path} element={<routes.view.element />} errorElement={<ErrorComponents />} /> {/* is another component/page which opens when we tap on mail to view it */}
      </Route>  

      <Route path={routes.invalid.path} element={<Navigate to={`${routes.emails.path}/inbox`} /> } /> {/*  this becomes the child of '/' page after .com/emails(anything other than valid route will navigate the page to /inbox page) */}
    </Route>
  )
)

// app.js page basically require home page as home page has all the page (header/sidebar/email),
// here header/sidebar remains same but emil page changes dynamically(sent/default/draft/bin etc.)
// so we create a file(routes.js) for all the routes in the Email/ViewEmail page

function App() {
  return (
    <Suspense fallback={<SuspenseLoader />}>   
      <RouterProvider router={router} /> 
    </Suspense> 
  );
}

export default App;
