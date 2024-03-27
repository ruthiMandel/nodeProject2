// import {Jwt} from "jsonwebtoken";
import jwt from "jsonwebtoken";
// const { Jwt } = pkg;
export const auth = (req, res, next) => {

    let token = req.headers["x-access-token"];
    if (!token)
        return res.status(401).json({ type: "not authorized", message: "missing token" })
    try {

        let user = jwt.verify(token, process.env.SECRET_JWT);
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(401).json({ type: "not authorized", message: "invalid token / token expired" })

    }

}

export const authAdmin = (req, res, next) => {

    let token = req.headers["x-access-token"];
    if (!token)
        return res.status(401).json({ type: "not authorized", message: "missing token" })
    try {

        let user = jwt.verify(token, process.env.SECRET_JWT);
        if (user.role != "ADMIN")
            res.status(403).json({ type: "not allowed", message: "this opration only manager" })
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(401).json({ type: "not authorized", message: "invalid token / token expired" })

    }

}
// Config->db
// import mongoose from "mongoose";

// export const connectToDB = async () => {
//     try {
//         let connect = await mongoose.connect(process.env.DB_URI||"mongodb://0.0.0.0:27017/coursesDB")
//         console.log("mongo db connected")
//     }
//     catch (err) {
//         console.log(err);
//         console.log("cannot connect to db");
//         process.exit(1)
//     }
// }
