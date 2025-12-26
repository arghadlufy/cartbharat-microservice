import express from "express";
import cors from "cors";
import { errorMiddleware } from "../../../packages/middlewares/error";
import { ValidationError } from "../../../packages/utils/error-handler";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  throw new ValidationError("Validation error", {
    field: "name",
    message: "Name is required",
  });
  res.send({ message: "Hello API" });
});

app.use(errorMiddleware);

const port = process.env.PORT || 6001;

const server = app.listen(port, () => {
  console.log(`[AUTH SERVICE] ready at http://localhost:${port}`);
});

server.on("error", (err) => {
  console.log(`[AUTH SERVICE] server error: ${err.message}`);
});
