import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(
  cors({
    // TODO: need to change to actual url when ready
    origin: "http://localhost:8000",
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
  res.status(200).json({ apiUrl: process.env.API_URL }).end();
});
app.use("/", router());
