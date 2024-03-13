const router = require('express').Router();

// Index for routes in application

// Import our modular routers for /notes
const notesRouter = require('./notes');

// route all paths to /notes to notesRouter
router.use('/notes', notesRouter);

module.exports = router;