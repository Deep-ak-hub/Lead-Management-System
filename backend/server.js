import dotenv from "dotenv";
dotenv.config();

import "./DB/connection.js";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import leads from "./src/routes/leads.route.js";
import admin from "./src/routes/admin.route.js";
import services from "./src/routes/services.route.js";
import projects from "./src/routes/projects.routes.js";

import {
  scheduleEmail,
  scheduleEmailForClient,
} from "./src/services/emailSchedular.js";
import { notFound, errorHandler } from "./src/middleware/errorMiddleware.js";

const app = express();
let port = process.env.PORT;

//cors middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(morgan("dev"));

//implement routes
app.use("/api", leads);
app.use("/api", admin);
app.use("/api", services);
app.use("/api", projects);
app.use("/api/check", (req, res) => {
  res.json({ message: "Hello Check" });
});
//middleware
app.use(notFound);
app.use(errorHandler);
app.use(express.urlencoded({ extended: true }));

//send follow up emails
scheduleEmail();
// scheduleEmailForClient();

app.listen(port, process.env.IPADDRESS, () => {
  console.log(`server is connected at http://${process.env.IPADDRESS}:${port}`);
});

app.listen(port, "0.0.0.0", () => {
  console.log("listening on network");
});
