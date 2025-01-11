import session from "express-session";
import dotenv from "dotenv";
dotenv.config();
const sessionConfig = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set this to `true` in production if using HTTPS
    maxAge: 1000 * 60 * 60, // 1 hour
  },
});

export default sessionConfig;
