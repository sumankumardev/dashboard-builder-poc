import mongoose from "mongoose";

const connectDb = async (): Promise<void> => {
  try {
    const mongoDbUrl = process.env.MONGO_DB_URL;
    if (!mongoDbUrl) {
      throw new Error("MONGODBURL is not defined in environment variable");
    }
    const conn = await mongoose.connect(mongoDbUrl);
    console.log(`MongoDb connected:${conn.connection.host}`);
    mongoose.connection.on("error", (err) => {
      console.error(`MongoDb connection error:${err}`);
      process.exit(1);
    });
    mongoose.connection.on("disconnected", () => {
      console.error("MongoDb disconnected");
      process.exit(1);
    });
  } catch (error) {
    console.error(`Error connecting to MongoDb:${error}`);
    process.exit(1);
  }
};

export default connectDb;
