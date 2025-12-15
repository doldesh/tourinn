import dotenv from "dotenv";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ Load your custom config.env file
dotenv.config({ path: path.resolve(__dirname, "../config.env") });

const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(DB);
    console.log(`Database connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ DB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
