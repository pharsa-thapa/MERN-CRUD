var express = require("express");
var router = express.Router();

// a middleware function with no mount path. This code is executed for every request to the router for Book Resource
router.use(function (req, res, next) {
  console.log("Default Function " + 'Time:', Date.now())
  next()
})

// a middleware sub-stack shows request info for any type of HTTP request to the /:id path
router.use('/:id', function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})

// a middleware sub-stack that handles GET requests to the /:id path
router.get('/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id === '0') next('route')
  // otherwise pass control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  // render a regular page
  //res.render('regular')
  res.send("Regular Function");
})

router.get('/:id', function(req, res, next){
    res.send("Special Function");
});

module.exports = router;