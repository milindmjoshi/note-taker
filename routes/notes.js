// Handles all routes to /notes
const notesRouter = require('express').Router();
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, writeToFile} = require('../helpers/fsUtils.js');

// For GET on /notes return and parse db.json file
notesRouter.get('/',(req,res)=>{
    console.log('note route');
    //readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
    fs.readFile('./db/db.json',(err,data)=>{
        if(err) throw err;
        console.log("Data: " + data);
        res.json(JSON.parse(data))
    })
})

// For POST on /notes, parse the rquest body for title and text and create
// a new note entry in the db.json file. Use the uuidv4 module to generate
// the id for the new note. 
notesRouter.post('/', (req,res)=>{
    console.log(`Got a ${req.method} method`);
    const {title, text} = req.body;
    console.log(`Title: ${title}, Text: ${text} `);
    // create new note using uuidv4 and the passed in title and text
    const note = {
        id: uuidv4(),
        title: title,
        text: text
    }
    
    // call read and append to append the note to the db.json file
    readAndAppend(note,'./db/db.json');
    res.status(200).send("Note added");
 })

 // Deletes a note with the given from the db
 notesRouter.delete('/:id',(req,res)=>{
    id = req.params.id;
    deleteNoteWithID(id,'./db/db.json')
    res.status(200).send("Note deleted");
    
 })

 
//  Function to read delete note with the given id from the db. It first
//  reads the db.json file, filters on the given id and removes that entry
//  from the filtered array, and then writes it back to db.json file

const deleteNoteWithID = (id, file) => {
    console.log("Id to delete: " +id);
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const notesArray = Array.from(JSON.parse(data));
        console.log(notesArray);
        const filteredArray = notesArray.filter((note)=>{
            return note.id !== id;
      })
        console.log("Filtered array: " + JSON.stringify(filteredArray));
        writeToFile('./db/db.json',filteredArray);
      }
    });
}



module.exports = notesRouter;
