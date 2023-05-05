const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Recommendation = require('../models/Recommendation');

//@desc Create a new user
//@route /users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    let success = false;
    if (!name || !email || !password) {
        res.status(400).json({ success, message: 'Please include all the fields' });
    }

    // Find if user already exists...
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).json({ success, message: 'User already exist' });
    }

    // Password hashing...
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a user...
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });
    if (user) {
        const token = generateToken(user._id);
        res.cookie('userToken', token, {
            expires: new Date(Date.now() + 6000000000),
            httpOnly: true
        });
        success = true;
        res.status(201).json({
            success,
            _id: user._id,
            name: user.name,
            email: user.email
        });
    }
    else {
        res.status(400).json({ success, message: 'Invalid user data' });
    }
});

//@desc Login a user
//@route /users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user._id);
        res.cookie('userToken', token, {
            expires: new Date(Date.now() + 6000000000),
            httpOnly: true
        });
        res.status(200).json({
            success: true,
            _id: user._id,
            name: user.name,
            email: user.email
        });
    }
    else {
        res.status(401).json({ success: false, message: 'Please enter valid credentials' });
    }
})

//@desc Get a current user..
//@route /users/me
//@access private
const getMe = asyncHandler(async (req, res) => {
    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
    };
    res.status(200).json(user);
});

//@desc Write a recommendation
//@route /users/write-a-recommendation
//@access private
const writeRecommendation = asyncHandler(async (req, res) => {
    const { company, designation, recommendationMessage } = req.body;

    if (!company || !designation || !recommendationMessage) {
        res.status(400).json({ success: false, message: 'Please include all the fields' });
    }
    // Create a new Recommendation...
    const recommendation = await Recommendation.create({
        user: req.user.id,
        name: req.user.name,
        email: req.user.email,
        company,
        designation,
        recommendationMessage
    });
    if (recommendation) {
        res.status(201).json({
            // user: recommendation.user,
            success: true,
            name: recommendation.name,
            email: recommendation.email,
            company: recommendation.company,
            designation: recommendation.designation,
            recommendationMessage: recommendation.recommendationMessage
        });
    }
    else {
        res.status(400).json({ success: true, message: 'Invalid recommendation data' });
    }
})

//@desc Get the user recommendations
//@route /users/recommendations
//@access private
const getRecommendations = asyncHandler(async (req, res) => {
    try {
        const recommendations = await Recommendation.find({ user: req.user.id });
        res.json({ success: true, recommendations });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}

module.exports = { registerUser, loginUser, getMe, writeRecommendation, getRecommendations };