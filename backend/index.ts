import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { authRoutes } from "./src/auth/routes/auth.routes";
import { petRoutes } from "./src/pets/routes/pet.routes";
import { seedRoutes } from "./src/seed/seed.route";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/seed", seedRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error: " + err.message);
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Error interno",
    },
  });
});
app.listen(PORT, async () => {
  console.log(`Running on port ${PORT} `);
});
