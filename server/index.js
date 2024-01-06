import express from 'express';
import connection from './database/db.js'; // .js 
import routes from './routes/route.js';
import cors from 'cors';
import path from 'path';

const __dirname = path.resolve(); // to resolve error

const app = express();

app.use(cors()); // to resolve CORS error
app.use(express.urlencoded({extended: true})); // so that it encodes the url 
app.use(express.json({extended: true})); // to convert the coming data into json format
app.use('/', routes); // as it hits /, it should go to routes to match the routes

// to pass the frontend address in backend 
app.use(express.static(path.join(__dirname, "./client/build"))); // we always make build of frontend

app.get('*', function (_, res) { // for every route we send an response which get the file from frontend(index.html)
    res.sendFile(path.join(__dirname, "./client/build/index.html"), function(err) { // we pass another function in case of error
        res.status(500).send(err);
    })
})

// 8000 port is not available all the time during production so we say use available port
const PORT = process.env.PORT || 8000; // and while using on local other port will be undefined so then use 

connection();  // calling the connection function


app.listen(PORT, () => console.log(`Server is executed on PORT ${PORT}`));