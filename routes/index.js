var router = require('express').Router()

var usersRouter = require('./users');
var apiBase = require('./apiBase');
var bookRouter = require('./books');
var personRouter = require('./persons');
var organisationRouter = require('./organisations');

router.use( '/books', bookRouter);
router.use('/users', usersRouter);
router.use('/persons', personRouter);
router.use('/organisations', organisationRouter);
router.use('/' , apiBase);

module.exports = router;
