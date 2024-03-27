import mongoose from "mongoose";

export const connectToDB = async () => {
    try {
        let connect = await mongoose.connect(process.env.DB_URI||"mongodb+srv://rr0548515128:326549805@ruthi.9ong0kt.mongodb.net/")
        console.log("mongo db connected")
    }
    catch (err) {
        console.log(err);
        console.log("cannot connect to db");
        process.exit(1)
    }
}