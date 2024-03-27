import { UserModel, generateToken } from "../models/user.js";
import bcrypt from "bcryptjs";

export const addUser = async (req, res) => {
    let { email, password, userName } = req.body;
    // const errors = userValidator(req.body);
    // console.log(errors)
    if (!email || !password || !userName)
        return res.status(404).json({ type: "missing parameters", message: "please send email user name and password" })
    try {
        const sameUser = await UserModel.findOne({ email: email });
        if (sameUser.length > 0)
            return res.status(409).json({ type: "same user", message: "user with such email already exists" })
        let hashedPassword = await bcrypt.hash(password, 15);
        let newUser = new UserModel({ email, password: hashedPassword, userName, role: "USER" });
        await newUser.save();
        // return res.json(newUser)
        let token = generateToken(newUser._id, newUser.role, newUser.userName);
        res.json({ _id: newUser._id, userName: newUser.userName, token, email: newUser.email })

    }
    catch (err) {
        res.status(400).json({ type: "invalid operation", message: "cannot add user" })
    }
}

export const login = async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password)
        return res.status(404).json({ type: "missing parameters", message: "please send email user name and password" })
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user)
            return res.status(404).json({ type: "no  user", message: "one or more details are invalid" })
        if (! await bcrypt.compare(password, user.password))
            return res.status(404).json({ type: "no  user", message: "user password is invalid" })

        let token = generateToken(user._id, user.role, user.userName);

        return res.json({ _id: user.id, userName: user.userName, token, email: user.email })
        // return res.json(user)
    }
    catch (err) {
        res.status(400).json({ type: "invalid operation", message: "cannot sign in user" })
    }
}



export const getAllUsers = async (req, res) => {

    try {
        // if(req.role!="ADMIN")
        //    res.status(400).json({ type: "invalid operation", message: "cannot sign in user" })
        let allUsers = await UserModel.find({}, "-password");
        res.json(allUsers);

    } catch (err) {
        res.status(400).json({ type: "invalid operation", message: "cannot sign in user" })
    }
}