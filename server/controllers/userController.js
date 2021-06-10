import Users from '../models/usersModel.js';
import bcrypt from 'bcrypt';


export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {

        if(!username || !email || !password) return res.status(400).json({success: false, error: "Please fill in all fields."})

        const user = await Users.findOne({email}) 

        if(user) return res.status(400).json({success: false, error: "This email already exist"})
        
        const newUser = await Users.create({ username, email, password });

        res.status(201).json({ success : true, newUser})
        
    } catch (error) {
        res.status(500).json({ success: false, error: error.message
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        res.status(400).json({ success: false, error: "Please enter your email and password"})
    }

    try {
        const user = await Users.findOne({ email }).select("+password");

        if(!user) res.status(404).json({success: false, error: "User doesn't exist."})

        const matchPassword = await bcrypt.compare(password, user.password);

        if(!matchPassword) return res.status(404).json({success: false, error: "Password is incorrect"});

        res.status(200).json({
            success : true,
            user
        })

    } catch (error) {
        res.status(500).json({ succes: false, error: error.message})
    }
}

export const forgotPassword = (req, res) => {
    res.send('forgot password route')
}

export const resetPassword = (req, res) => {
    res.send('reset password route')
}