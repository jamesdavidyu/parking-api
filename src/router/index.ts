import express from "express";
import authentication from "./authentication";
import users from "./users";
import reservations from "./reservations";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  reservations(router);

  return router;
};
