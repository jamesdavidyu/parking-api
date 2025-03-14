import crypto from "crypto";

require("dotenv").config();

const SECRET = process.env.SECRET;

// creating access token
export const random = () => crypto.randomBytes(128).toString("base64");
// change auth method to jwt and bcrypt - placeholder auth
export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};
