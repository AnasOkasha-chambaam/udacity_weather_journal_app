// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser'),
cors = require('cors');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const serverPort = 8030;

// *_ Setup routes
app.get('/tempData',(req,res)=>{ // get route
    return projectData;
})
app.post('/addData',(req,res)=>{
    let incommingRequestBody = req.body;
    console.log(incommingRequestBody);
    if(incommingRequestBody.temperature && incommingRequestBody.date){
        console.log('passed');
        projectData = {...incommingRequestBody};
        console.log('jj',projectData)
    } else {
        return 'Something wrong with the submitted info. Please, resubmit it.'
    }
})





let startServer = app.listen(serverPort,()=>{ // start the server on the specified port
    console.log("The server ran successfully on localhost:"+port);
});