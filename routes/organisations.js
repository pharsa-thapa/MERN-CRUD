var express = require("express");
var router = express.Router();
var personRouter = require("./persons")
var organisationModel = require("../models/organisationModel");

router.use('/:id/persons', function(req, res, next) {
                           req.organisationId = req.params.id;
                           next()
                         }, personRouter);

router.get("/", function(req, res, next){
    organisationModel.find({}, function(err, organisations) {
          if (err) {
             res.json({"error" : "Internal Sever Error"});
          } else {
             res.json(organisations);
          }
    });

});

router.get("/:id", function(req, res, next){
    organisationModel.findById(req.params.id, function(err, organisation) {
          if (err) {
               res.json({"error" : "Internal Sever Error"});
          } else {
                if(organisation == undefined ){
                   res.status(404).json({"error" : true,"message" : "Record not found"});
                }else{
                   res.json(organisation);
                }
          }
    });
});

router.post("/", function(req, res, next){
    organisationModel.create(req.body)
    .then(function(newOrganisation){
        console.log("New Organisation", newOrganisation);
        res.json(newOrganisation);
    })
    .catch(function(err){
        if(err.name = "ValidationError"){
            console.log("validation errors", err);
            res.status(422).json(err);
        }else{
            console.error(err);
            res.status(500).json(err);
        }
    });
});


router.delete("/:id", function(req, res){
    organisationModel.findById(req.params.id, function(err, organisation){
        if(err || organisation == undefined ){
            res.status(404).json({"error" : true,"message" : "Record not found"});
        }else{
            organisationModel.deleteOne({_id : req.params.id}, function (err){
                if(err){
                    res.status(422).json({"error" : true,"message" : "Error deleting data"});
                }else{
                    res.json({"message" : "Organisation with id " + req.params.id + " is deleted successfully"});
                }
            });
        }
    });
});

router.put('/:id', function(req, res){
    var query = {'_id': req.params.id};
    organisationModel.findOneAndUpdate(query, req.body, {upsert: true}, function(err, updatedOrganisation) {
        if (err) return res.status(500).json({error: err});
        return res.json({"message": 'Succesfully saved.', "organisation": updatedOrganisation});
    });
});

//
//router.get("/:id/persons", function(req, res){
//    organisationModel.findById(req.params.id)
//    .populate("employees")
//
//    .then(function( organisation) {
//            if(organisation == undefined ){
//               res.status(404).json({"error" : true,"message" : "Record not found"});
//            }else{
//               res.json(organisation);
//            }
//    })
//    .catch(function(err){
//        res.status(422).json({"error" : true,"message" : "Error fetching data"});
//    });
//});

module.exports = router;
