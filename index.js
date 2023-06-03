import express from "express";
import { ShoppingRoutes } from "./routes/ShoppingRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
import { dataBaseConnection } from "./db.js";
import { logInRoute } from "./routes/userLogin.js";
import { signUpRoute } from "./routes/userSignup.js";
import { ResetRoutes } from "./routes/forgetPassword.js";

const app = express();
dotenv.config();
dataBaseConnection();
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/shop", ShoppingRoutes);

app.use("/login", logInRoute);
app.use("/signup", signUpRoute);
app.use("/", ResetRoutes);
app.get("/", (req, res) => {
  res.send("Working Fine");
});

app.listen(process.env.PORT);
