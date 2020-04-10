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
var config_data = require('../config')()

const PersonSchema = new Schema({
    username : { type : String, trim : true, maxlength : 32, required: [true, 'Your username cannot be blank.'],unique: [true, "Username already taken"]},
    name : { type : String, trim : true, maxlength : 400, required: [true, 'Name cannot be blank.'] },
    age : { type : Number },
    email : { type : String, trim : true, maxlength :100, required: [true, 'Your Email cannot be blank.'],unique: [true, "Email already taken"] },
    location : { type : String, trim : true , maxlength:100 },
    created_at : { type : Date, default: Date.now },
   //static organisation id set as default
    organisation : { type: Schema.Types.ObjectId, ref: 'organisations', default : config_data.DEFAULT_ORGANISATION }
//    organisation : { type: Schema.Types.ObjectId, ref: 'organisations' }

});

module.exports  = mongoose.model("persons", PersonSchema);

