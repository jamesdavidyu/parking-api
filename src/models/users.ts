import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  reservations: {
    car: { type: String },
    from: { type: Date },
    to: { type: Date },
  },
});

export const UserModel = mongoose.model("User", UserSchema);
