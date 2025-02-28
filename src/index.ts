import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";
import path from "path";

require("dotenv").config();

const app = express();

app.use(express.static(path.join(__dirname, "./public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
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

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));

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
