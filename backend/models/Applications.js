const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;

const ApplicationsSchema = new Schema({
    applicantname: {
        type: String,
        required: true,
    },
    lawyername: {
        type: String,
        required: true,
    },
    judgename: {
        type: String,
        required: true
    },
    subject: {
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
    ]
});

const Applications = mongoose.model("applications", ApplicationsSchema);
module.exports = Applications;