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
const Applications = require('../models/Applications');

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

router.get('/user', authMiddleware(), (req, res) => {
    try {
        const userData = req.user;
        res.status(200).json({ msg: userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post('/createApplication', authMiddleware([Lawyer,Applicant]), async (req, res) => {
    const { applicantname, lawyername, accusedname, offence, description, attachments, hearings, bailprob } = req.body;

    if (!applicantname || !lawyername || !offence || !description || !accusedname || !bailprob) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    try {
        const newApplication = new Applications({
            applicantname,
            lawyername,
            offence,
            description,
            accusedname,
            attachments,
            hearings,
            status: 'pending',
            bailprob
        });

        await newApplication.save();
        return res.status(201).json({ message: "Application created successfully", application: newApplication });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Fetch all applications (Everyone can see)
router.get('/applications', async (req, res) => {
    try {
        const applications = await Applications.find();
        return res.status(200).json(applications);

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Upload attachments (only Lawyer or Applicant can upload)
router.patch('/applications/:id/uploadAttachments', authMiddleware([Lawyer, Applicant]), async (req, res) => {
    const { id } = req.params;
    const { attachments } = req.body;

    try {
        const application = await Applications.findById(id);

        if (!application) {
            return res.status(404).json({ error: "Application not found" });
        }

        // Append new attachments to the existing ones
        application.attachments = application.attachments ? application.attachments.concat(attachments) : [attachments];

        await application.save();
        return res.status(200).json({ message: "Attachments uploaded successfully", application });

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Update hearings (only Judge can update)
router.patch('/applications/:id/updateHearings', authMiddleware([Judge]), async (req, res) => {
    const { id } = req.params;
    const { hearings } = req.body;

    try {
        const application = await Applications.findById(id);

        if (!application) {
            return res.status(404).json({ error: "Application not found" });
        }

        // Update hearings
        application.hearings = hearings;

        await application.save();
        return res.status(200).json({ message: "Hearings updated successfully", application });

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Update case status (only Judge can update)
router.patch('/applications/:id/updateStatus', authMiddleware([Judge]), async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
    }

    try {
        const application = await Applications.findById(id);

        if (!application) {
            return res.status(404).json({ error: "Application not found" });
        }

        // Update status
        application.status = status;

        await application.save();
        return res.status(200).json({ message: "Status updated successfully", application });

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});



module.exports = router;