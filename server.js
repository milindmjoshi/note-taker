const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,resp)=>{
    resp.sendFile(path.join(__dirname,'/public/index.html'));
})

app.listen(PORT,(err)=>{
    err? console.log(err):console.log(`Server listening on port ${PORT}`);
})