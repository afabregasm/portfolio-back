const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const resumeSchema = new Schema({
  fullName: String,
  position: String,
  contact: {
    location: String,
    phoneNumber: Number,
    email: String,
    linkedin: String,
    github: String,
  },
  about: String,
  education: [
    {
      course: String,
      institution: String,
      location: String,
      date: String,
    },
  ],
  experience: [
    {
      position: String,
      company: String,
      location: String,
      date: String,
      functions: [String],
    },
  ],
  hardSkills: [String],
  softSkills: [String],
  languages: [
    {
      language: String,
      level: String,
    },
  ],
});

module.exports = model("Resume", resumeSchema);
