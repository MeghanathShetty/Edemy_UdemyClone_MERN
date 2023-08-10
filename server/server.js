import express from "express";
import cors from "cors";
import { readdirSync } from "fs";
import mongoose from "mongoose";
import csrf from "csurf";
import cookieParser from "cookie-parser";
const morgan = require("morgan");
require("dotenv").config();

// custom imports
// const auth=require('./routes/auth');
// const forgotPassword=require('./routes/forgotPassword');
// const payment=require('./routes/payment');

const csrfProtection = csrf({ cookie: true });

// create express app
const app = express();

// db
mongoose.connect(process.env.DATABASE, {}).then(() =>
 console.log("***DB CONNECTED***")).catch((err) => console.log("DB CONNECTION ERR => ", err));

// apply middlewares
app.use(cors());
app.use(express.json({limit:"5mb"}));
app.use(cookieParser());
app.use(morgan("dev"));

// route
// app.use("/api/auth",auth);
// app.use("/api/password-reset",forgotPassword);
// app.use("/api/payment",payment);

readdirSync("./routes").map((r) => 
{
  app.use("/api", require(`./routes/${r}`));
});

// csrf
app.use(csrfProtection);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
