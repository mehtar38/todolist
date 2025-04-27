//Recieves request, calls services, sends response

const userService = require("../services/signup")

async function createUser(req, res) {
    try{
        const userData = req.body;
        const user = await userService.createUser(userData);
        res.status(201).json({user: user, message: "User created"})
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

async function loginUser(req, res) {
    try {
        const userData = req.body; // Get email and password from request body
        const { user, token } = await userService.loginUser(userData); // Call the service to login the user

        res.status(200).json({
            message: "Login successful",
            user,
            token
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


module.exports = {createUser, loginUser};