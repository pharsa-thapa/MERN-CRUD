var express = require("express");
var router = express.Router();
var personModel = require("../models/personModel")
var emailHelper = require('../helpers/emailHelper')
var emailTemplateHelper = require("../helpers/emailTemplateHelper")

router.post("/",function (req, res){
    personModel.create(req.body)
    .then(function (newPerson){
        personModel.findById(newPerson._id)
        .populate("organisation")
        .then(function(newPerson){
            body = emailTemplateHelper.registrationTemplate(newPerson.name, newPerson.organisation.name );
            emailHelper.sendMail(newPerson.email, "Welcome", body.text, body.html);
            res.json(newPerson);
        })
    })
    .catch(function (err){
        if (err.name == 'ValidationError') {
            res.status(422).json(err);
        }else{
            console.error(err);
            res.status(500).json(err);
        }
    })
});

router.get("/", function(req, res, next){
    personModel.find({}, function(err, persons) {
        if (err) {
           res.json({"error" : "Internal Sever Error"});
        } else {
           res.json(persons);
        }
    });
});

router.get("/:id", function(req, res, next){
    personModel.findById(req.params.id, function(err, person) {
        if (err) {
            res.json({"error" : "Internal Sever Error"});
        } else {
              if(person == undefined ){
                 res.status(404).json({"error" : true,"message" : "Record not found"});
              }else{
                 res.json(person);
              }
        }
    });
});

router.delete("/:id", function(req, res){
    personModel.findById(req.params.id, function(err, person){
        if(err || person == undefined ){
            res.status(404).json({"error" : true,"message" : "Record not found"});
        }else{
            personModel.deleteOne({_id : req.params.id}, function (err){
                if(err){
                    res.status(422).json({"error" : true,"message" : "Error deleting data"});
                }else{
                    res.json({"message" : "Person with id " + req.params.id + " is deleted successfully"});
                }
            });
        }
    });
});

module.exports = router;