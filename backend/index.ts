import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { authRoutes } from "./src/auth/routes/auth.routes";
import { petRoutes } from "./src/pets/routes/pet.routes";
import { seedRoutes } from "./src/seed/seed.route";
import cors from "cors";
import { authenticateToken } from "./src/utils";
import path from "path";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`, // tu frontend
    credentials: true,
  })
);

const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

app.use("/api/auth", authRoutes);
app.use("/api/pets", authenticateToken, petRoutes);
app.use("/api/seed", authenticateToken, seedRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.all("/{*any}", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

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
  console.log(path.join(__dirname, "../frontend/dist/index.html"));
});
