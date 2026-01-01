import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        const connection = await mongoose.connect(process.env.mongodb_url);
        console.log("Connected DB:", mongoose.connection.name);
        console.log("Mongo DB connceted successfully");
    } catch(e) {
        console.log("ERROR : ",e);
    }
}