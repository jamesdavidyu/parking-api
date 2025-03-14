import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";
import path from "path";

// environment variables for security
require("dotenv").config();

// index at root of folder to initialize api, all other files are getting routed through this file.
const app = express();

// adding ui code to keep everything in one repo for easier deployment
app.use(express.static(path.join(__dirname, "./public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
// only this url can access
app.use(
  cors({
    // TODO: need to change to actual url when ready
    origin: process.env.API_URL,
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log("Server running.");
});

const MONGO_URL = process.env.CONNECTION_STRING;
// would probably opt for sql database with this app since not much unstructured data
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));

// passing url to client for api requests to be able to use since env variables cannot be accessed by client
app.get("/", (req, res) => {
  res.render("index", { apiUrl: process.env.API_URL });
});
app.get("/parking", (req, res) => {
  res.render("parking", { apiUrl: process.env.API_URL });
});
app.get("/profile", (req, res) => {
  res.render("profile", { apiUrl: process.env.API_URL });
});
app.get("/signup", (req, res) => {
  res.render("signup", { apiUrl: process.env.API_URL });
});

app.use("/", router());
