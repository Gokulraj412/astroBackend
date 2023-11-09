const mongoose = require("mongoose");
const validator = require('validator');

const astrologerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
  },
  dateOfBirth: {
    type: String,
    required: [true, "Please enter Date of birth"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email address"],
  },
  mobilePrimery: {
    type: String,
    required: [true, "Please enter mobile-no"],
    unique: true,
  },
  mobileSecondry: {
    type: String,
    required: [true, "Please enter mobile-no"],
    unique: true,
  },

  address: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  education: {
    type: String,
    required: [true, " Please Enter Education"],
  },
  experience: {
    type: String,
    required: [true, " Please Enter year of experience"],
  },

  course: {
    type: String,
    required: [true, "Please enter Course"],
  },
  instituteAndTeacher: {
    type: String,
    // required:[true,'Please enter Institute']
  },

  aboutAstro: {
    type: String,
    maxlength:[50,'should be maximum 50 characters'],
    // required:true
  },
  aboutExp: {
    type: String,
    maxlength:[50,'should be maximum 50 characters'],
    
    // required:true
  },
  knowAboutAstro: {
    type: String,
    // required:true
  },
  workingHours: {
    type: String,
    // required:[true,' Please Enter Education']
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
let Astrologer = mongoose.model("Astrologer", astrologerSchema);

module.exports = Astrologer;
