//File Name:
//Author: Amandeep Aujla
//Student ID: 300823928
//Website:https://comp308-w17-midterm-300823928.herokuapp.com/aaujla55



//requires modules for user model
let mongoose = require("mongoose");
let Schemna = mongoose.Schema;

let passportLocalMongoose = require("passport-local-mongoose");

//we are making user collection
let UserSchema = new Schema({
    username: {
        type: String,
        default:'',
        trim: true,
        required: 'username is required'
    },
    password: {
        type: String,
        default:'',
        trim: true,
        required: 'password is required'
    },
      email: {
        type: String,
        default:'',
        trim: true,
        required: 'email is required'
    },
    displayName: {
        type: String,
        default:'',
        trim: true,
        required: 'displayName is required'
    },
    created:{
        type: String,
        default:Date.now
    },
    updated:{
        type: String,
        default:Date.now
    }
},
{
    collection: "users"
})
let options= ({missingPasswordError:"Wrong password"});

UserSchema.plugin(passportLocalMongoose,options);
exports.User = mongoose.model('User',UserSchema);//user object will be defined
