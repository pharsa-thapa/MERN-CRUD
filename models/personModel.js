/**
 * @swagger
 *  components:
 *    schemas:
 *      Person:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - username
 *        properties:
 *          name:
 *            type: string
 *          username:
 *            type: string
 *            description: Email for the user, needs to be unique.
 *          location:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *          age:
 *            type: number
 *          organisation:
 *            type: string
 *            description: ID of existing organisation.
 *        example:
 *           username : pharsa-thapa,
 *           name : Pharsa Thapa,
 *           email : suresh.thapa.mgr.45@gmail.com
 *           location : Sydney
 *           organisation : 5e872dea01143f08e1180146
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var config_data = require('../config')()

const PersonSchema = new Schema({
    username : { type : String, trim : true, maxlength : 32, required: [true, 'Your username cannot be blank.'],unique: [true, "Username already taken"]},
    name : { type : String, trim : true, maxlength : 400, required: [true, 'Name cannot be blank.'] },
    age : { type : Number },
    email : { type : String, trim : true, maxlength :100, validate: {
                                                                   validator: function(v) {
                                                                       var re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
                                                                       return (v == null || v.trim().length < 1) || re.test(v)
                                                                   },
                                                                   message: 'Provided email address is invalid!'
                                                               },unique: [true, "Email already taken"] },
    location : { type : String, trim : true , maxlength:100 },
    created_at : { type : Date, default: Date.now },
    phone    : { type: String,/*not required by default**/
                     validate: {
                         validator: function(v) {
                             var re = /^[A-Z0-9._%+-]/i;
                             return (v == null || v.trim().length < 1) || re.test(v)
                         },
                         message: 'Provided phone number is invalid!'
                     }
        },
   //static organisation id set as default
    organisation : { type: Schema.Types.ObjectId, ref: 'organisations', default : config_data.DEFAULT_ORGANISATION }
//    organisation : { type: Schema.Types.ObjectId, ref: 'organisations' }

});
PersonSchema.plugin(uniqueValidator, { message: '{PATH} is already taken!' });
module.exports  = mongoose.model("persons", PersonSchema);

