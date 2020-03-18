var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next){
    res.send("This is API base");
});

router.post("/", function(req, res, next){
    res.send("This is API base POST request");
});

module.exports = router;