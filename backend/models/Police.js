const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;

const PoliceSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: True
    },
    phone: {
        type: String,
        required: True
    },
    password: {
        type: String,
        required: true,
    }
});

PoliceSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d",
            }
        );
    } catch (error) {
        console.error("Token Error: ", error);
    }
};

const Police = mongoose.model("police", PoliceSchema);
module.exports = Police;