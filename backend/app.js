import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import qs from "qs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import tourRouter from "./routes/tourRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config({ path: "./config.env" });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("query parser", (str) => qs.parse(str, { allowDots: true }));

//Parsing nested queries
app.set("query parser", "extended");

// Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url);

//Get the directory name from the file path
const __dirname = dirname(__filename);

//Middlewares
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Serve static file
app.use(express.static(path.join(__dirname, "./public")));

//Routes
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

//Export App for Server
export default app;

//Everything express related stays in this file
