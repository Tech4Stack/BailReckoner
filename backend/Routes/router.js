require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authmiddleware');

module.exports = router;