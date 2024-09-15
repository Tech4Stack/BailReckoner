const jwt = require('jsonwebtoken');
const Applicant = require('../models/Applicant');
const Police = require('../models/Police');
const Judge = require('../models/Judge');
const Lawyer = require('../models/Lawyer');

const Models = [Applicant, Police, Judge, Lawyer];

const authMiddleware = (userModel) => {
    return async (req, res, next) => {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: "Unauthorized HTTP, Token not provided" });
        }

        const jwtToken = token.replace(/^Bearer\s/, "").trim();
        console.log("Token from middleware ", jwtToken);

        try {
            const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
            console.log("Decoded Token: ", isVerified);

            let userData = null;

            if (Array.isArray(userModel)){
                for (const Model of userModel) {
                    userData = await Model.findOne({ _id: isVerified._id }).select({ password: 0 });
                    if (userData) {
                        console.log(Model);
                        userData.role = Model;
                        break;
                    }
                }
            } else {
                for (const Model of Models) {
                    userData = await Model.findOne({ _id: isVerified._id }).select({ password: 0 });
                    if (userData) {
                        userData.role = Model;
                        break;
                    }
                }
            }

            if (!userData) {
                console.log("User not found");
                return res.status(401).json({ message: "User not found" });
            }

            req.user = userData;
            req.token = token;
            req.userID = userData._id;

            next();
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };
};

module.exports = authMiddleware;