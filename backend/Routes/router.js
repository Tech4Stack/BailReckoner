require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authmiddleware');
const Lawyer = require('../models/Lawyer');
const bcrypt = require('bcryptjs');
const Judge = require('../models/Judge');
const Police = require('../models/Police');
const Applicant = require('../models/Applicant');

router.post('/registerAdvocate', async (req, res) => {
    const { fullname, id, department, email, phone, password } = req.body;
    if (!fullname || !id || !department || !email || !phone || !password) {
        return res.status(400).json({ error: 'Please fill in all fields' });
    }

    try {
        const existingUser = await Lawyer.findOne({ $or: [{ email: email }, { id: id }] });
        
        if (existingUser) {
            console.log('User already exists! with that username or email or id');
            return res.status(422).json({ error: "User already exists! with that username or email or id"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const advocate = new Lawyer({
            fullname, id, department, email, phone, password: hashedPassword
        })

        advocate.save().then(async advocate => {
            return res.json({
                message: "Registered Successfully",
                advocateId: advocate._id.toString(),
            });
        })
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
})

router.post('/registerJudge', async (req, res) => {
    const { fullname, id, department, email, phone, password } = req.body;
    if (!fullname || !id || !department || !email || !phone || !password) {
        return res.status(400).json({ error: 'Please fill in all fields' });
    }

    try {
        const existingUser = await Judge.findOne({ $or: [{ email: email }, { id: id }] });

        if (existingUser) {
            console.log('User already exists! with that username or email or id');
            return res.status(422).json({ error: "User already exists! with that username or email or id"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const judge = new Judge({
            fullname, id, department, email, phone, password: hashedPassword
        })

        judge.save().then(async judge => {
            return res.json({
                message: "Registered Successfully",
                judgeId: judge._id.toString(),
            });
        })
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
})

router.post('/registerPolice', async (req, res) => {
    const { fullname, id, department, email, phone, password } = req.body;
    if (!fullname || !id || !department || !email || !phone || !password) {
        return res.status(400).json({ error: 'Please fill in all fields' });
    }

    try {
        const existingUser = await Police.findOne({ $or: [{ email: email }, { id: id }] });

        if (existingUser) {
            console.log('User already exists! with that username or email or id');
            return res.status(422).json({ error: "User already exists! with that username or email or id"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const police = new Police({
            fullname, id, department, email, phone, password: hashedPassword
        })

        police.save().then(async police => {
            return res.json({
                message: "Registered Successfully",
                policeId: police._id.toString(),
            });
        })
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
})

router.post('/registerApplicant', async (req, res) => {
    const { fullname, email, phone, password } = req.body;
    if (!fullname || !email || !phone || !password) {
        return res.status(400).json({ error: 'Please fill in all fields' });
    }

    try {
        const existingUser = await Applicant.findOne({ $or: [{ email: email }, { fullname: fullname }] });

        if (existingUser) {
            console.log('User already exists! with that username or email');
            return res.status(422).json({ error: "User already exists! with that username or email" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const applicant = new Applicant({
            fullname, email, phone, password: hashedPassword
        })

        applicant.save().then(async applicant => {
            return res.json({
                message: "Registered Successfully",
                applicantId: applicant._id.toString(),
            });
        })
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
})

router.post('/login/:USER', async (req, res) => {
    const { email, password } = req.body;
    const { USER } = req.params;

    if (!email || !password) {
        return res.status(422).json({ error: "Please provide a valid email and password" });
    }

    try {
        let user;

        switch (USER.toLowerCase()) {
            case 'nyay sahayak':
                user = await Judge.findOne({ email });
                if (!user) {
                    return res.status(422).json({ error: "Invalid username or password" });
                }
                await user.save();
                break;
            case 'advocate':
                user = await Lawyer.findOne({ email });
                if (!user) {
                    return res.status(422).json({ error: "Invalid username or password" });
                }
                await user.save();
                break;
            case 'applicant':
                user = await Applicant.findOne({ email });
                if (!user) {
                    return res.status(422).json({ error: "Invalid username or password" });
                }
                await user.save();
                break;
            case 'police':
                user = await Police.findOne({ email });
                if (!user) {
                    return res.status(422).json({ error: "Invalid username or password" });
                }
                await user.save();
                break;
            default:
                return res.status(400).json({ error: "Invalid USER parameter" });
        }

        if (!user) {
            return res.status(422).json({ error: "Invalid username or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const secretKey = process.env.JWT_SECRET_KEY || 'yourDefaultSecretKey';
            const token = jwt.sign({ _id: user.id }, secretKey);

            return res.status(200).json({
                user: user,
                message: "Login successful",
                token,
            });
        } else {
            return res.status(404).json({ error: "Invalid Credentials!!!" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
})

router.get('/user', authMiddleware(Police || Applicant || Lawyer || Judge), (req, res) => {
    try {
        const userData = req.user;
        res.status(200).json({ msg: userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post('/createApplication', authMiddleware(Lawyer), async (req, res) => {
    const { applicantname, lawyername, judgename, subject, description, attachements, hearings } = req.body;
    if (applicantname || lawyername || subject || description) {
        return res.status(500).json({error: "All fields are required!!!"})
    }
})

module.exports = router;