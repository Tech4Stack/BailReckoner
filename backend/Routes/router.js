require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authmiddleware');
const Lawyer = require('../models/Lawyer');
const bcrypt = require('bcryptjs');

router.post('/registerAdvocate', async (req, res) => {
    const { fullname, id, department, email, phone, password } = req.body;
    if (!fullname || !id || !department || !email || !phone || !password) {
        return res.status(400).json({ error: 'Please fill in all fields' });
    }

    try {
        const existingUser = await Lawyer.findOne({ $or: [{ email: email }, { id: id }] });
        
        if (existingUser) {
            console.log('User already exists! with that username or email');
            return res.status(422).json({ error: "User already exists! with that username or email" });
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

module.exports = router;