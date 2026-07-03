import dotenv from "dotenv";
import connectDb from "./config/db.js";
import Express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import "./models/widget.model.js";
import "./models/dashboard.model.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import widgetRoutes from "./routes/widget.routes.js";

const app = Express();
dotenv.config();

await connectDb();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(Express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});

app.use("/api/dashboards", dashboardRoutes);
app.use("/api/widgets", widgetRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
