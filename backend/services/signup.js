//Takes the data for a new user, hashes the password and stores 
// the data and the hashed pass in the Database.
//The actual logic for creating the User

const User = require("../models/users");
const bcrypt = require("bcrypt");
const { generateToken } = require('../middlewares/jwt-helper')

async function createUser(userData) {
    const existingUser = await User.findOne({email: userData.email});
    if(existingUser) {
        throw new Error("USer already exists");
    }
    
    const hashPass = await bcrypt.hash(userData.password, 10);
    
    const newUser = new User({
        email: userData.email, 
        password: hashPass
    });

    const savedUser = await newUser.save(); //Saves new user to MongoDB
    return savedUser;
}

async function loginUser(userData) {
    const existingUser = await(User.findOne({email: userData.email}));
    if (!existingUser) {
        throw new Error("User doesn't exist. Please Register first!");
    }

    const isPasswordValid = await bcrypt.compare(userData.password, existingUser.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }

    const token = generateToken({email: existingUser.email});
    // const token = jwt.sign({ email: existingUser.email }, secretKey, { expiresIn: '1h' });

    return { user: existingUser, token };
}

module.exports = { createUser, loginUser };