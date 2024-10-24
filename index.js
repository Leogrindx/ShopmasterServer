import express from "express";
import router from "./router.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorMiddleware from "./middlewares/error-middleware.js";
dotenv.config();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [process.env.CLIENT_URL, process.env.DEVELOP_URL],
  })
);
app.use("/api", router);
app.use(errorMiddleware);

app.listen(process.env.SR_PORT, () =>
  console.log(`SERVER STARTED ON PORT ${process.env.SR_PORT}`)
);
