import app from "./app.js";
import dotenv from "dotenv";

// dotEnv config
dotenv.config();

// env variables
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is listening at ${PORT}...`);
});
