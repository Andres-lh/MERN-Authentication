import Users from '../models/usersModel.js';
import bcrypt from 'bcrypt';
import ErrorResponse from '../utils/errorResponse.js';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendEmail.js';


export const register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {

        if(!username || !email || !password) return next(new ErrorResponse("Please fill all the fields"), 400)

        const user = await Users.findOne({email}) 

        if(user) return next(new ErrorResponse("This email already exists"), 400);
        
        const newUser = await Users.create({ username, email, password });

        sendToken(newUser, 201, res);

    } catch (error) {
            next(error);
    }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) return next(new ErrorResponse("Please enter your email and password"), 400)

    try {
        const user = await Users.findOne({ email }).select("+password");

        if(!user) return next(new ErrorResponse("User doesn't exist."), 404)

        const matchPassword = await bcrypt.compare(password, user.password);

        if(!matchPassword) return next(new ErrorResponse("Password is incorrect"), 401)

        sendToken(user, 201, res);

    } catch (error) {
        next(error);
    }
}

export const forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await Users.findOne({email});

        if(!user) return next(new ErrorResponse("Email could not be sent", 404));

        const accessToken = resetPasswordToken(user);

        const resetUrl = `${process.env.CLIENT_URL}/users/resetpassword/${accessToken}`;
        
        const message =  `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password</p>
            <a href= ${resetUrl} clicktraking = off> ${resetUrl}</a> 
        `
        try {
            await sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                text: message
            })

            res.status(200).json ({ success: true, data: "Email sent"});
        } catch (error) {
            return next(new ErrorResponse("Email could not be send", 500));
        }

    } catch (error) {
        next(error);
    }
}

export const resetPassword = async (req, res, next) => {

    try {
        const token = req.params.resetToken
        const decodedToken = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);

        const user = await Users.findOne({ _id: decodedToken.id});

        if(!user) return next(new ErrorResponse("Invalid reset token", 400));

        user.password = req.body.password;

        await user.save();
   
        res.status(200).json ({ success: true, data: "The password has been changed"})
        
    } catch (error) {
        next(error);
    }
}

const sendToken = (user, statusCode, res) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d"})
    res.status(statusCode).json({ success: true, token });
}

const resetPasswordToken = (user) => {
    const token = jwt.sign({ id: user._id }, process.env.RESET_PASSWORD_SECRET, { expiresIn: "10m"})
    return token;
}