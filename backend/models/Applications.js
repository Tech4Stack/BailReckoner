const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;

const ApplicationsSchema = new Schema({
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
    },
    applicantname: {
        type: String,
        required: true,
    },
    lawyername: {
        type: String,
        required: true,
    },
    accusedname: {
        type: String,
        required: true,
    },
    period: {
      type: String  
    },
    offence: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    attachments: {
        type:String
    },
    hearings: [
        {
            type: String
        }
    ],
    bailprob: {
        type: Number,
        required: true    }
});

const Applications = mongoose.model("applications", ApplicationsSchema);
module.exports = Applications;