var express = require("express");
var router = express.Router({mergeParams: true});
var personModel = require("../models/personModel")
var emailHelper = require('../helpers/emailHelper')
var emailTemplateHelper = require("../helpers/emailTemplateHelper")

/**
 * @swagger
 * tags:
 *   name: Persons
 *   description: User management
 */

/**
 * @swagger
 * path:
 *  /persons/:
 *    post:
 *      summary: Create a new person
 *      tags: [Persons]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Person'
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Person'
 */

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
            let customError = { error: "Unknown Error",  message: "Unknown error!" }
            res.status(500).json(err);

        }
    })
});


router.get("/", function(req, res, next){
    let getParam = (req.organisationId !== undefined ) ? { organisation : req.organisationId } : {};
    personModel.find( getParam , function(err, persons) {
        if (err) {
           res.json({"error" : "Internal Sever Error"});
        } else {
           res.json(persons);
        }
    });
});

/**
 * @swagger
 * path:
 *  /persons/{personId}:
 *    get:
 *      summary: Get a person by id
 *      tags: [Persons]
 *      parameters:
 *        - in: path
 *          name: personId
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the person
 *      responses:
 *        "200":
 *          description: A Person object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Person'
 */
router.get("/:id", function(req, res, next){
    let getParam = { _id : req.params.id } ;
    if (req.organisationId !== undefined ) { getParam.organisation = req.organisationId}
    personModel.findOne(getParam, '-__v' ,function(err, person) {
        if (err) {
            res.json({"error" : "Internal Sever Error" + err});
        } else {
              if(person == undefined ){
                 res.status(404).json({"error" : true,"message" : "Record not found"});
              }else{
                 res.json(person);
              }
        }
    });
});

/**
 * @swagger
 * path:
 *  /persons/{personId}:
 *    put:
 *      summary: update a person by id
 *      tags: [Persons]
 *      parameters:
 *        - in: path
 *          name: personId
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the person
 *      responses:
 *        "200":
 *          description: A Person object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Person'
 */
router.put('/:id', function(req, res){
    var query = {'_id': req.params.id};

    var newDetails = {'name': req.body.name, 'location': req.body.location, 'phone': req.body.phone};

    personModel.findOneAndUpdate(query, newDetails, {upsert: true}, function(err, updatedPerson) {
        if (err) return res.status(500).json({error: err});
        personModel.findOne(query, '-__v' ,function(err, person) {
                if (err) {
                    res.json({"error" : "Internal Sever Error" + err});
                } else {
                      if(person == undefined ){
                         res.status(404).json({"error" : true,"message" : "Record not found"});
                      }else{
                         res.json(person);
                      }
                }
            });
    });
});

router.delete("/:id", function(req, res){
    let getParam = { _id : req.params.id } ;
    if (req.organisationId !== undefined ) { getParam.organisation = req.organisationId}

    personModel.findOne(getParam, function(err, person){
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