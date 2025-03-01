import express from "express";
import { isAuthenticated } from "../middlewares";
import {
  createNewReservation,
  getReservationsFromAndTo,
} from "../services/reservations";

export default (router: express.Router) => {
  router.get(
    "/reservations/:from&:to",
    isAuthenticated,
    getReservationsFromAndTo
  );
  router.post("/reservations", isAuthenticated, createNewReservation);
};
