import express from "express";
import userRouter from "./routes/user.routes";
import postRouter from "./routes/post.routes";
import coordRouter from "./routes/coordinate.routes";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello VTS!");
});
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/coords", coordRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
