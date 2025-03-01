import { ReservationModel } from "../models/reservations";

export const getReservationsByFrom = (from: Date) =>
  ReservationModel.findOne({ from });
export const getReservationsByTo = (to: Date) =>
  ReservationModel.findOne({ to });
export const createReservation = (values: Record<string, any>) =>
  new ReservationModel(values)
    .save()
    .then((reservation) => reservation.toObject());
