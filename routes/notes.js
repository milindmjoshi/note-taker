const notesRouter = require('express').Router();
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { readAndAppend} = require('../helpers/fsUtils.js');

notesRouter.get('/',(req,res)=>{
    console.log('note route');
    //readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
    fs.readFile('./db/db.json',(err,data)=>{
        if(err) throw err;
        console.log("Data: " + data);
        res.json(JSON.parse(data))
    })
})

notesRouter.post('/', (req,res)=>{
    console.log(`Got a ${req.method} method`);
    const {title, text} = req.body;
    console.log(`Title: ${title}, Text: ${text} `);
    const note = {
        id: uuidv4(),
        title: title,
        text: text
    }
    
    readAndAppend(note,'./db/db.json');
    res.status(200).send("Note added");
 })

module.exports = notesRouter;
