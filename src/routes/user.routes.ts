import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import * as userController from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/", async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const id = uuidv4();
    user.id = id;
    user.createdAt = new Date().toISOString();
    const data = await userController.createUser(user);
    res.status(201).send(data);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send(error);
  }
});

userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const data = await userController.getUsers();
    res.status(200).send(data);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).send(error);
  }
});

userRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const data = await userController.getUser(req.params.id);
    res.status(200).send(data);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).send(error);
  }
});

userRouter.put("/email/:id", async (req: Request, res: Response) => {
  try {
    const data = await userController.updateUserEmail({
      id: req.params.id,
      email: req.body.email,
    });
    res.status(200).send(data);
  } catch (error) {
    console.error("Error updating user email:", error);
    res.status(500).send(error);
  }
});

userRouter.patch("/phone/:id", async (req: Request, res: Response) => {
  try {
    const data = await userController.updateUserPhone({
      id: req.params.id,
      phone: req.body.phone,
    });
    res.status(200).send(data);
  } catch (error) {
    console.error("Error updating user phone:", error);
    res.status(500).send(error);
  }
});

userRouter.patch("/role/:id", async (req: Request, res: Response) => {
  try {
    const data = await userController.updateUserRole({
      id: req.params.id,
      role: req.body.role,
    });
    res.status(200).send(data);
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).send(error);
  }
});

userRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const data = await userController.deleteUser(req.params.id);
    res.status(200).send(data);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send(error);
  }
});

export default userRouter;
