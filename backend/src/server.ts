import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

import connectDB from "./services/database";
import auth from "./routes/api/auth";
import user from "./routes/api/user";

const app = express();

// Connect to MongoDB
connectDB();


const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
}

// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));

// @route   GET /
// @desc    Test Base API
// @access  Public
app.get("/", (_req, res) => {
  res.send("API Running");
});

app.use("/api/auth", auth);
app.use("/api/user", user);

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
