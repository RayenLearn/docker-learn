import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import RedisStore from "connect-redis";
import session from "express-session";
import { createClient } from "redis";
import { post } from "./router/post.js";
import { user } from "./router/user.js";

const app = express();
app.enable("trust proxy");

function connectWithRetry(retry = 3) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("connected");
    })
    .catch((e) => {
      if (retry > 0) setTimeout(() => connectWithRetry(retry - 1), 5000);
      else console.log(e);
    });
}

connectWithRetry();

let redisClient = createClient({ url: "redis://cache:6379" });
redisClient.connect().catch(console.error);

let redisStore = new RedisStore({
  client: redisClient,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    store: redisStore,
    resave: false, // required: force lightweight session keep alive (touch)
    secret: "keyboard cat",
  })
);
app.use("/posts", post);
app.use("/user", user);
app.all("*", (_req, res) => res.status(404).json({ success: false }));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Listing");
});
