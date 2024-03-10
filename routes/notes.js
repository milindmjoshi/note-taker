const notesRouter = require('express').Router();
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, writeToFile} = require('../helpers/fsUtils.js');

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

 notesRouter.delete('/:id',(req,res)=>{
    id = req.params.id;
    deleteNoteWithID(id,'./db/db.json')
    res.status(200).send("Note deleted");
    
 })

 /**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */
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
