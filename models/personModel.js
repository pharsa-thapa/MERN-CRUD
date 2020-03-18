const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    username : { type : String, trim : true, maxlength : 32, required: [true, 'Your username cannot be blank.'],unique: [true, "Username already taken"]},
    name : { type : String, trim : true, maxlength : 400, required: [true, 'Name cannot be blank.'] },
    age : { type : Number },
    email : { type : String, trim : true, maxlength :100, required: [true, 'Your Email cannot be blank.'],unique: [true, "Email already taken"] },
    location : { type : String, trim : true , maxlength:100 },
    created_at : { type : Date, default: Date.now }

});

module.exports  = mongoose.model("persons", PersonSchema);

