const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrganisationSchema = new Schema({
    name : { type : String, trim : true, maxlength : 400, required: [true, 'Name cannot be blank.'], unique: [true, "Organisation already taken"] },
    address : { type : String, trim : true, maxlength : 400, required: [true, 'Address cannot be blank.'] },
    contactnumber : { type : Number, trim : true, required: false },
    employees : [{
                   type: Schema.Types.ObjectId, ref: 'persons'
                }],
    created_at : { type : Date, default: Date.now }

});

module.exports = mongoose.model("organisations", OrganisationSchema);