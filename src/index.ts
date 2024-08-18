import express, { Application } from "express";
import dotenv from "dotenv";
import { setupAuthRoutes } from './routes/AuthRoutes';
import { setupProfileRoutes } from './routes/ProfileRoutes';
import connectDB from "./db/db";
import { setupSwagger } from "./swagger";

dotenv.config();

const startServer = async () => {
  await connectDB();

  const app: Application = express();
  const port = process.env.PORT || 8000;

  setupSwagger(app);

  app.use(express.json());
  setupAuthRoutes(app);
  setupProfileRoutes(app);

  app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
  });
}

startServer().catch(error => {
  console.error('Failed to start the server', error);
  process.exit(1);
});


