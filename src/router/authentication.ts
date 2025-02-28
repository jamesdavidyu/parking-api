import express from "express";
import { login, logout, register, verify } from "../services/authentication";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.get("/auth/verify", isAuthenticated, verify);
  router.get("/auth/logout", isAuthenticated, logout);
};
