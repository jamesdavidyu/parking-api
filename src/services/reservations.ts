import { UserModel } from "../models/users";
import {
  getReservationsByFrom,
  getReservationsByTo,
  createReservation,
} from "../controllers/reservations";
import { getUserBySessionToken } from "../controllers/users";
import express from "express";

export const getReservationsFromAndTo = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { from, to } = req.params;

    if (!from || !to) {
      return res.sendStatus(400);
    }

    const fromReservations = await getReservationsByFrom(new Date(from));
    const toReservations = await getReservationsByTo(new Date(to));
    return res.status(200).json([fromReservations, toReservations]);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const createNewReservation = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { car, from, to } = req.body;
    const sessionToken = req.cookies["PARKING-AUTH"];

    if (!sessionToken) {
      res.sendStatus(403);
    }

    if (!car || !from || !to) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.sendStatus(400);
    }

    // TODO: should still add a check that already reserved

    const newReservation = {
      car: car,
      from: from,
      to: to,
    };

    const reservation = await createReservation(newReservation);

    if (!reservation) {
      return res.sendStatus(400);
    }

    existingUser.reservations = newReservation;
    await existingUser.save();

    return res.status(200).json(reservation).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
