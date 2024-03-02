import express from "express";
import userRouter from "./routes/user.routes";
import postRouter from "./routes/post.routes";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello VTS!");
});
app.use("/users", userRouter);
app.use("/posts", postRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
