import mongoose from "mongoose";

export async function dbConnect(){
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("MongoDB connection successful");
        });
        connection.on("error", (err) => {
          console.log("Error occured while connecting to database: ", err)
        });
        
    } catch (error) {
        console.log("Something went wrong while connecting to Database: ", error)
    }
};