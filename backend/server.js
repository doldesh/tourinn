import app from "./app.js";
import connectDB from "./config/db.js";

connectDB();

const PORT = process.env.PORT || 3000;

//Start server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

//Everything server related stays in this file
