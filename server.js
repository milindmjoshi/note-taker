const express = require('express');
const fs = require('fs');
const path = require('path');
// routes/index.js is the main routes index for the application routes
const api = require('./routes/index.js');

const app = express();
//const PORT = 3001;
const port = process.env.PORT || 3001

// serve static routes from public folder
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// Return index.html for GET /
app.get('/',(req,resp)=>{
    resp.sendFile(path.join(__dirname,'/public/index.html'));
})

// Return notes.html for GET /notes
app.get('/notes',(req,resp)=>{
    resp.sendFile(path.join(__dirname,'/public/notes.html'));
})

// for all other GET paths , return index.html. Normally This would be used
// for a 404 but the README instructions for the challenge on line 49 says
// it should return the index.html file
app.get('*',(req,resp)=>{
    resp.sendFile(path.join(__dirname,'/public/index.html'));
})

// Start server on port 3001
app.listen(port,(err)=>{
    err? console.log(err):console.log(`Server listening on port ${port}`);
})