import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
  car: { type: String, required: true },
  from: { type: Date, required: true },
  to: { type: Date, required: true },
});

export const ReservationModel = mongoose.model(
  "Reservation",
  ReservationSchema
);
