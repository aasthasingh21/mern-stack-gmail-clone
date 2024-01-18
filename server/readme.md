### CLIENT

1 : create react app called client 
// index.js is the main file for react and index.html is the main file for web/browser

2 : create a folder called pages which will include all the pages(home/main etc.)

# HEADER :-
1 : create a folder called components (we create a different folder because components from this folder will be used in every page), eg: header/footer etc

2 : we make use of Material UI (a css library for react)
// install 1 : npm install @mui/material @emotion/react @emotion/styled and we use Appbar and Toolbar for blue header
// install 2 : npm install @mui/icons-material to use the icons
// to change specific css property of an element we make use of "styled" component and change according

3 : create a new folder as constants and make a file as constants.js 
// make a const with logo ka url and export it and style css as per need 

4 : make use of icons for search and tune icon, to add input(we make use of inputBase/Text field) from @mui

5 : make use of other icons for optionbar 

# SIDEBAR :-
1 : create a file called sidebar.jsx in components folder 

2: import Drawer from @mui (Drawer = contents that can be costomise according (when to show/ how its gonna slide on the screen etc))
// drawer has components like anchor(to determine the position etc.)

3 : make another file called sidebarcontent to add all the contents 
// sidebar is also divide into 2 parts (compose and other things)
// import box and button and style is accordingly

4 : make a folder called config in src and make a file called sidebar.config.js
// add the (data) in an array form of all the elements with name, title and icon(use it from @mui) and export it
// import data in sidebarcontent.jsx, now as the data is in array form so we have to display it using list and listitem from @mui
// as the data coming is in array so we map it and show the icon(in form of components) and title(by mapping)
// we style the entire box as per require(styled from @mui)

5 : to toggle the sidebar with menuicon
// go to home page : and make use of useState named as opendrawer to control the state of that element
// a function toggleDrawer is created to tract down setOpendrawer's state(if its false make it true and if true make it false)
// toggleDrawer is passed in the header as a props from the home.jsx
// toggleDrawer is reeceived/used as a prop (object destructuing) and is triggered when clicked on the menuicon
// opendrawer is passed as a prop to the sidebar.jsx
// in the sidebar.jsx is used as a prop and is triggered by using it on open 

# POPUP or COMPOSE MAIL :-
1 : create a new file as composemail.jsx in the components folder
// now as the dialog(the popup) will apper after clicking on compose so it will hidden at start so dosent matter where it placed/added, so just add in sidebarcontent.jsx file
// go to composemail.jsx and import dialog and use it, define its props(open/close, paperprops = for css editing)
// The page is divide into 4 parts, import all the necessary components and style using styled mui
// 1 : header(New Message) : use typography (@mui component for <p> tag)
// 2 : To and Subject : using inputbase
// 3 : Message(Type your message) : using text-field
// 4 : footer : buttons (send, delete(is the icon itself))

2 : Go to sidebar.jsx, and make use of useState to control the state of the dialog page, intially the satate is hidden/false
// when composeButton is clicked a function is passsed called as onComposeClick() which triggers the setOpenDialog to true
// now openDialog and setOpenDialog is passed as prop in the ComposeMail and received on the page using object destructuring method
// openDialog state is triggered by opening prop of the Dialog on ComposeMail file and the satate is made visible
// to close the Dialog page, a function called as closeCompose is passsed when clicked on the close icon
// closeCompose is a function which makes the setOpenDialog to false to exit the page
// and the process repeats for send button and delete button for now(as the backend is not being made)

3 : SMTPjs : simple mail transfer protocol : used to send mail through js 
// code the script tag and paste it in your index.html file
// take the code for email sending and paste it in the function(sendMail = is passed when send button is clicked and the Dialog page is also closed) 
// go to generate smtp server - log in - home page - settings - smtp - generate credentials - get password/username - paste in the code for Email.send
// to send mails get your mail verified on the smtp website and then can send a mail
// as we have used the smtp script code, it gets attached to the window so we have to make sure(tell the code) that a window is present so (window.Email.send) is used
// we have to alter/change the data in the to/subject/body of the mail so a function(onValueChange ) is passed/triggered when anything changed/typed
// as onValueChange is passed on to/subject/body so to differentiate we make use of name=''
// these values need to bbe stored so we make use of usestate (data) and store it as an object{} 
// when onValueChange is trigged, it altee/change the data value by setData and the data with other values(name, value(to/subject/body)) are get 
// these data(the change in the to/subject/body) is set in the sendMail information as To : data.to, data.subject, data.body and get
// AS we know others can access the code from the website so its not safe to mention the sensitive information directly so we make use of .env file (to store the username and password from config)

# BACKEND SETUP :-
1 : make a folder as server - open terminal - npm init -y(ask for all the requirements etc) - npm install express
// it gives a package.json file which mentions main file as index.js so create a file called index.js and import express, initialise express in app, and mention/create a port (8000 for backend), app/listen to get your file work on that particular port
// go to package.json and add type = module in after main and change test to start : node index.js(so that when you use command start it should run index.js file)

2 : Database Setup : mongodb cloud - make new cluster and connect 
// npm install mongoose : a mongodb wrapper 
// make a new folder database and a file db.js in the server folder
// import mongoose and conncet it with mongodb cloud with the help of url from the database : we make use of try-catch block bz the data is on cloud and might get errors

# APIs :- we store the send mail in the database(send/draft etc) 
1 : Creating the api
// make a file called api.js in a folder called services in src, npm install axios(to fetch api, can directly use fetch() function but here we choose axios (library for api calling))
// go to api.js and import axios, make a function which returns axios api {all the information about api}, we want this api to be called automatically so we put it in middleware

2 : make a custom hooks folder with useApi.jsx file (to edit the api)/ making middleware
// import API_GMAIl and make use of useState to store the response, error and isLoading state in useApi function and return the same
// make another function in useApi as call which will call the API_GMAIL, and response with the data and return it like other states
// import this as sentEmailServices in ComposeMail.jsx and initialize it, sinnce we need to mention the type and method of the api so make a file called api.urls.js in services and add the infomation as saveSentEmail
// use this saveSentEmail in the sentEmailServices
// now go useApi.jsx and use it as urlObject - then go to api.js and use change the method,endpoint with respect to urlObject(eg : method: urlObject.method, url:urlObject.endpoint)
// as it also requires payload so go to composeMail.jsx - sentEmail and create payload - pass this payload using saveSentServices.call(payload) to useApi.jsx - call function - pass it in API_GMAIl - go to api.js and change the data: payload
// if no error then close the Composemail Dialog and setdata to empty for new mails(done in ComposeMail.jsx-sentEmail())

# BACKEND SETUP 2 :-
1 : make a folder as routes and a file called route.js for all the routes in the project
// import express and assign it to router = express.Router() (used for all the routing in express js)
// create /save route (to save the information of the mail sent, and is a post route), with the route pass a function called sentSaveEmails which is imported from folder controller (email-controller.js)
// email-controller.js (saveSentEmails) make use of emails(collection) from model folder consisting email.js file with Email as the model consisting the schema(table of information = collection)
// go to index.js and app.use('/', routes) : (to go to routes and match which routes to use)
// CORS : npm install cors to avoid cors error and use it in index.js
// use urlencoded(to encode the coming req) and json(to convert it to json format)
// send a test mail which will be received in the database(collection)

# FRONTEND ROUTING (ALL THE PAGES : SENT/DRAFT ETC.) :-
1 : go to components make a new file called as Email(Which is all the mails) and import it on the home.jsx and use it as page(display it with header/sidebar)
// now pass openDrawer as a prop in the Emails and receive it on the Email page and use to style the email page as to when opendrawer is true make the margin 250 and when false make it to 0

2 : as we have to handle the routings so we make use of npm install react-router-dom and import all the necessary elements/components on the app.js page
// app.js page basically require home page as home page has all the page (header/sidebar/email), here header/sidebar remains same but emil page changes dynamically(sent/default/draft/bin etc.) so we create a file(routes.js) for all the routes in the Email page
// 1 : 1st route is the '/' route which render(element = Home page) and is the Parent Route 
// 2 : 2nd route is the '/emails' which render(element = Email page) and is the 1st child of home route('/')
   * '/emails/:type' : further determines the type of route(eg : '/emails/draft or '/emails/bin' etc)
   * 4 ; 4th route is the '/*' route which render( element = Email) as anything typed after '/emails' takes/  navigate it to default(inbox page) 
// 3 : 3rd route is the '/view' route which render(element = ViewEmail page (we create a new file viewEmail.jsx just like Email.jsx)) and is the 2nd child of home route('/')
 # These process even explain the routes on the app.js file.

3 : We make use of lazy to import the components (* we have used on routes.js file) (as it is considered good practice for big projects and direct importing is not suggested), works only for export default; and not just export(eg: export const fall = {})
// since we have used lazy to import so we have to make use of Suspense(App.js) and wrap that particular component page with suspense, suspense takes a fallback prop(we make a suspenseLoader.jsx file) for the loading page and pass it to the Suspense.

4 : As we know Home(Parent page) has 2 child pages (1 : Email and 2 : ViewEmail)
// Email and ViewEmail pages are switched as per the need (When we open a mail to read/view we are directed to view page by '/view' route)
// As initially we has Passed only Email page (along with Header and Sidebar), now we have to pass Email and ViewEmail page but is again switched(as viewEmail page takes place of Email page when opened) so we make use of Outlet component from react-router-dom.
// Since Email/ViewEmail page changes its style by using openDrawer state so now we pass context={{openDrawer}} in outlet to send/pass the state to both the pages together.
// Both Email and ViewEmail make use of useOutletContext to take/get the prop(openDrawer) and used accordingly.
// We make use of Suspense on the Outlet as well because it renders(Email/ViewEmail) which are imported with lazy on the routes.js page.

5 : To handle the error we make a component(ErrorComponent.jsx)
// For Client : we simply show a typography(p) saying error 
// For Server : we make use of useRouteError() which is a custom useState for error handling.

# TO SELECT THE ITEMS IN THE SIDEBAR ACCORDINGLY :-
1 : go to sidebarcontent.jsx : we have to link the listitems with routes, url of two types : 1 : params(/..), 2 : query(?...)
// here we use params so we make use of useParams from react-router-dom
// useParams is assigned in the type(whatever name is given in the url) (const { type} = useParams();)
// Now we have to select listitem with respect to url(type === data.name ?{ if yes then change the style as per mentioned} : {if not then keep it empty}), here name is used as the key mentioned in the sidebarconfig.js
// to select/navigate each components with url we make use of Navlink(Listitems are wrapped inside navlink)
// As we use mapping for getting each item so we have to provide a key(data.name = name is the key from the data obtained), this key is navigated(works just like navigate) to the routes(we import the routes.js) and use `${routes.emails.path}/${data.name}` as the key is match with the emails. so when we tap on a particular component that route is opened(emails from that route is opened).
// navlink basically gives an anchor tag which disrupts the styling of listitems so we use 'container > ul(list) > a(navlink) to style all the components.

2 : To Show only the particular mails when clicked on it(eg: drafts show only mails in the drafts)
// go to Email.jsx and create a constant/var type by useParams to know the url of the route
// go to api.url.js and create a new url(getEmailFromType) and import Api-Urls(from api.url.js) and useApi.jsx in email.jsx
// create a const getEmailServices and assign/use in useApi(API_URLS.getEmailFromType), make use of useEffect state to getEmailServices.call(which is in useApi.jsx) and pass 2 arguments ( {}, type), one empty and second type(as params)
// getEmailServices.call({}, type) {passed as params in Email.jsx} - call(payload, type) and res = API_GMAIL(urlObject, payload, type) {received as params in useApi.jsx} - API_GMAIL(urlobject, payload, type) and iin url: API_URLS/urlObject.endpoint/type {used as params in api.js}
// go to route.js(backend) and create a new get route for type (routes.get('/emails/:type', getEmails(which is created in email.controller.js)))
// so create a new function getEmails in email.controller.js, emails(a var is created), which uses Email.find(type: req.params.type), who uses find function from mongodb to find the type of params(url to match with listitem) to show the response(which will the mails on the ui)

3 : To save draft-mails : when we write a mail and not delete/send it gets saved in drafts 
// we create new api-urls saveDraftEmail with endpoint: 'save-draft' and method: post in api.urls.js
// we make new api.url(saveDraftEmail) in api.url.js, which is then initialized/assigned in saveDraftServices with useApi and api.urls  const saveDraftServices = useApi(API_URLS.saveDraftEmail)
// since a paylod is created for sent mails (when clicked on send button), so now we use same payload for draft mails(type = drafts) (which clicked on closeicon) in composemail.jsx
// go to route.js and create a new route('/save-draft', saveSentEmail), here we use saveSentEmails(controller) bz it has the same work (save the mail in the databse)

# TO SHOW THE PAGES ON SCREEN(UI) EG: INBOX/DRAFT/BIN etc.
1 : The Email page is basically divided into 2 parts: select option etc and the mails
// go to email and use box, styled to style the box for the top part
// for second part(mails) is a page displaying all the mails(so we need a new page EachEmail.jsx)
// as we show all the mails together on the Email.jsx page so we make use of list(ul/ol here list in @mui) for single mail we import EachEmail.jsx
// When we will open EachEmail folder it basically show the data(response which we get using api), so to get response in useApi page we return (call, reponse, error, isLoading) which are assigned in getEmailService so we  getEmailService?.response?.map(email => ( <EachEmail> )), 
// since data is mapped so we provide a key={email.id} // as each id is different
// now email is passed and received as a prop in EachEmail
 
2 : go to EachEmail receive the prop(email = response)
// each mail consist of checkbox, star, name of the person, subject, body, date which is all gotten by using email as prop(eg: email.name = gives name of the person who has sent the mail) and is styled using @mui accordngly

3: Checkbox (to select all) 
// An onChange function(selectAllEmails) when clicked on checkbox, as checkbox gives true/false so we have to maintain a state(usestate)(selectedEmsils) : initially [] [as many will get selected later on]
// selectAllEmails function takes in the event(e) and e.target.checked(for checkbox its chacked(input me value(e.target.value)))
// if (e.target.checked) is true then (emails = getEmailService?.response?.map(email => email._id)) just like how emails are sent in EachEmails (it will map with email._id) and setSelectedEmail(emails = response), else it will setSelectedEmails([]) // to default state

4 : Delete emails : if already in bin delete permanent if not move it to bin : SELECTING THE MAIL
// An OnClick function(deleteSelectedEmails) is triggered with click on deleteicon
// Go to api.urls.js and make a new api_url(moveEmailToBin) with endpoint: 'bin' and method: post as it has to be shown in the bin 
// Go to Email and assign (moveEmailToBinServices = useApi(API_URLS.moveEmailToBin)), make the function deleteSelectedEmails(), here if (type === 'bin) which means its already in bin so we have to delete permanently (empty for now) , else (moveEmailToBinServices.call(selectedEmails)) moveEmailToBinServices use call from useApi and now the selectedEmails are to be checkedd checked(as they use email._id), so we pass selectedEmails as a prop in EachEmail.jsx and is received and use to link both the checkboxes (checked={selectedEmails?.includes(email._id)}), checks if selectedEmails includes email._id with id and then is checked
// a new state refreshScreen is used to refresh the screen when deleteAllEmails is run then change to new screen otherwise dont

5 : To align mails to different pages/type : To update to bin
// to update to bin : got to route.js(backend) and add a new route routes.post('/bin', moveEmailsToBin)
// go to email-controller.js and create a new controller (moveEmailsToBin), make use of async-await
// use Email.updateMany(mongodb function to select many items) if the -id is included in the body{ _id: { $in:req.body }}, if yes the set the bin to true, starred to false and type to empty {$set: { bin: true, starred:false, type: ''}} ** $in and $set ** is considered as very important functions in mongodb.

6 :  To align mails to different pages/type : TO send mails to different types
// 1 : to bin : if(req.params.type === 'bin') if the type is bin find bin = true in mails  (emails = await Email.find({ bin: true }))

// 2 : to all mails : (req.params.type === 'all mails') no criteria as all mails will contain all the mails (emails = await Email.find({});) 

// 3 : to get mails as the type/url is hit(done before) : emails = await Email.find({ type: req.params.type });

# VIEW PAGE :-
1 : When clicked on <Box : name, subject, body, date> its opened(not on checkbox or star) in the EachEmail.jsx
// so we make use of navigate, since its hooks so we initialize it to navigate, it navigates to routes.view.path(routes folder - view - takes its path)

2 : Design of view page : which is divided into 3 parts : icons, subject and body of the mail so go to viewEmail and design using @mui

3 : back arrow : when clicked it uses window.history.back() {which is a window function that takes you back to your previous tasts by tracking history}

4 : As we want the data from mail (subject, body) so we go to eacheamil.jsx and pass another argument in navigate function (state: email : email to send the data of mail to viewpage) called as state and we pass eamil in the viewEmail.jsx and is received in viewEmail with useLocation(a custom hook which returns an object), so we get state by using(useLocation).
// as state consist/has the data(email) so by object destructuring we get email from state and use it to get the subject of the email.
// next we add a profilepicture(dummy by creating in constant.js) and then get name and to from email.
// we make use of some html tags but not directly, with help of codes(&#60; and &#62; gives<>, &nbsp; gives space)
// then we add date in next box and then the body of the email and design it with @mui

# TO SELECT STAR (STARRED TYPE) ;-
1 : go to api.url.js and create new api as toggleStarredEmail with endpoint: starred and method: Post
2 : go to eachemail and an onclick function is passed when clicked on starred icon, now we import and use useApi and Aapi.urls and assign it in toggleStarredServices
// when toggleStarredEmail is triggered by staricon then call is removed/get from toggleStarredServices(toggleStarredServices.call(id: email.-id, value: !email.starred)), email.id is passed in id and value is changed as per the condition
// to refresh the page go to Email.jsx and pass setRefreshScreen in EachEmail.jsx, and receive it as a prop in EachEmail.jsx and use in toggleStarredEmail function to change the prev state
// if email.starred? (if email is already stared) then StarIcon(without border is used) else StarborderIcon is used

3 : go to route.js(backend) and make a new route for starred emails (/starred) and a function toggleStarredEmails is called in email-controller.js (routes.post('/starred', toggleStarredEmails))
// email-controoler.js (Email.updateOne({ _id: req.body.id}, {$set: {starred: req.body.value }})), takes data/req from frontend and updateOne by one (as starred only one at a time), so _id is get and then change the value to starBorderIcon to StarIcon.

4 : to change the color of star : style it in the icon(style={})

5 : to sent the starred marked mails to starred type 
// go to email-controller.js and getEmails, put else if and find whose type === starred, starred: true and bin: false (emails = await Email.find({ starred: true, bin: false }))

# TO DELETE THE MAIL (INSIDE VIEW) :-
1 : go to viewEmail : and a onClick function is triggered on click of delete icon, this functions uses same moveEmailsToBinServices with .call and with id(from useApi - api-urls) {moveEmailToBinServices.call([email._id]);}

# IF NO MAIL :-
1 : go to contant.js and make types for empty_tabs, now go to Email.jsx as we already have type as params so we can use it to get the response just like it was used in EachEmail.jsx
// if the response is empty(as we get data in array form so we check the length === 0) then show NoMails.jsx
// now we make a new page as NoEmails.jsx and show it on Emails.jsx page with the customise message from empty_tags in constant(we import and use which message to show as per type)
// go to NoEmail.jsx and receive message as a prop and use to show the heading and subheading, style with @mui

# SELECT EACH CHECKBOX :-
1 : go to EachEmail.jsx and onchange of checkbox a function is triggered onValueChange
// go to email.jsx and pass setselectedEmails as prop and receive it in EachEmail.jsx
// when onValueChange function runs it checks if the id is matched/included or not {if(selectedEmails.includes(email._id))} if yes then change the prevstate of {selectedmails(setSelectedmails)} if id dosent match and if match then dont change {when the checkbox is already checked and we click on it gets unchecked and vise-verca}, if match the id select(check it) if dosent match then uncheck it

# TO DELETE MAIL PERMANENTLY :-
1 : go to Email.jsx and we already have a function deleteSelectedEmails, if type is not bin then send to bin if type is bin delete permanently
// go to api.urls.js and make a new url as delete with endpoint delete and method delete
// import it in email.jsx and assign it in deleteEmailsServices and delete the selected email (basically sending the req to backend) {deleteEmailsServices.call(selectedEmails);} in function deleteSelectedEmails
// go to route.js(backend) and make a new routes.delete('/delete', deleteEmails)
// go to email-controller.js and make new controller(deleteEmails)
// we have to delete from database so we use deletemany(mongodb function), many as we will be deleting from bin, delete those whose id : is req.body from frontend.

# DEPLOYMENT : cyclic.sh/ Render
1 : go to the cd server and npm install dotenv (for passwords and username etc)
2 : create a .env file in server folder
3 : import and config {dotenv.config()} in db.js and store password and username of atlas in the .env folder
4 : ${process.env.username/password} to get the password/username
5 : nodemon is a dev dependency and is not used in production so we change it to 'node index.js' (package.json),
   can uninstall the nodemon (or npm install --save-dev nodemon : basically it is put under dev dependencies)
6 : While deplyoing we deploy client/server together so we put/move client folder inside server folder
   (backend will be deployed and we will pass the frontend address in it) 
7 : To pass the address we make use of {app.use(express.static(path.join(__dirname, "./client/build")))} 
   in index.js file, it takes static files(frontend files) with directoryname and the address, we never pass the 
   address directly we build frondend for that 
8 : index.html is the main file for frontend so use get the index.html file from client(frontend), 
   (res.sendFile(path.join(__dirname, "./client/build/index.html"))),
9 : 8000 port is not available all the time during production so we say use available port 
   (const PORT = process.env.PORT || 8000;), we mention 8000 again for local servers
10 : search where you have used localhost and except for readme.md file remove the localhost used (mostly in api.js)
11 : as we use (path.join), so we have to install path(npm install path in server), const __dirname = path.resolve
   (); to resolve __dirname error
12 : go to cd server - cd client - npm run build (to start client folder), check localhost:8000 on web
13 : push the code on github and go to cyclic.sh/Render