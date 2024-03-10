const notesRouter = require('express').Router();
const path = require('path');

notesRouter.get('/',(req,res)=>{
    console.log('note route');
})

module.exports = notesRouter;
