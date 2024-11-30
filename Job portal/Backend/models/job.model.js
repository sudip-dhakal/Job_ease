const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  requirements: [{
    type: String,  
  }],
  description: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  experienceLevel: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Company",
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  
  },
  applications: [{
    type: mongoose.Schema.Types.ObjectId,  
    ref: "Application", 
  }]
}, {
  timestamps: true,
});


const Job = mongoose.model('Job', jobSchema);

module.exports = { Job };
