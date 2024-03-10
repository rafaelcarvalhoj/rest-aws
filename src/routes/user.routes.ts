import { Router, Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import * as userController from "../controllers/user.controller";

const userRouter = Router();

interface SocialMedia {
  provider: string;
  url: string;
}

interface Resume {
  socialMedia: SocialMedia[];
  articles: string[];
  diploma: string[];
  skills: string[];
  microResume: string;
  projectRole: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  createdAt: string;
  avatar: string;
}

userRouter.post("/", async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const id = uuidv4();
    user.id = id;
    user.createdAt = new Date().toISOString();
    const data = await userController.createUser(user);
    if (!data) {
      res.status(400).send({ message: "Error creating user" });
      return;
    }
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
    res.status(500).send(error);
  }
});

userRouter.get("/password/:id", async (req: Request, res: Response) => {
  try {
    const data = await userController.checkPassword(
      req.params.id,
      req.body.password
    );
    if (data === null) {
      res.status(404).send({ message: "Usuário não encontrado" });
      return;
    }

    if (!data) {
      res.status(401).send({ message: "Senha inválida" });
      return;
    }
    res.status(200).send(data);
  } catch (error) {
    console.error("Error getting user password:", error);
    res.status(500).send(error);
  }
});

userRouter.put("/update/:id", async (req: Request, res: Response) => {
  try {
    const data = await userController.updateUser(req.params.id, req.body);
    if (!data) {
      res.status(404).send({ message: "Usuário não encontrado" });
      return;
    }
    res.status(200).send(data);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send(error);
  }
});

userRouter.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await userController.login(email, password);
    if (!user) {
      res.status(401).send({ message: "Invalid Credentials" });
      return;
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

userRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const data = await userController.getUser(req.params.id);
    if (!data) {
      res.status(404).send({ message: "User not Found" });
      return;
    }
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
    if (!data) {
      res.status(404).send({ message: "Usuário não encontrado" });
      return;
    }
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
    if (!data) {
      res.status(404).send({ message: "Usuário não encontrado" });
      return;
    }
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
    if (!data) {
      res.status(404).send({ message: "Usuário não encontrado" });
      return;
    }
    res.status(200).send(data);
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).send(error);
  }
});

userRouter.patch("/password/:id", async (req: Request, res: Response) => {
  try {
    const data = await userController.updateUserPassword({
      id: req.params.id,
      password: req.body.password,
    });
    if (!data) {
      res.status(404).send({ message: "Usuário não encontrado" });
      return;
    }
    res.status(200).send(data);
  } catch (error) {
    console.error("Error updating user password:", error);
    res.status(500).send(error);
  }
});

userRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const data = await userController.deleteUser(req.params.id);
    if (!data) {
      res.status(404).send({ message: "Usuário não encontrado" });
      return;
    }
    res.status(200).send(data);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send(error);
  }
});

userRouter.post("/resume/:id", async (req: Request, res: Response) => {
  try {
    const data = userController.createResume(req.params.id, req.body);
    if (!data) {
      res.status(404).send({ message: "User nor found" });
    }
    res.status(201).send({ message: "Resume created" });
  } catch (error) {
    console.error("Error updating user resume:", error);
    res.status(500).send(error);
  }
});

userRouter.get("/resume/:id", async (req: Request, res: Response) => {
  try {
    const data = await userController.getResume(req.params.id);
    if (!data) {
      res.status(404).send({ message: "User not found" });
    }
    return res.status(200).send({
      ...data,
      createdAt: undefined,
      password: undefined,
      role: undefined,
      phone: undefined,
    });
  } catch (error) {
    res.send(500).send(error);
  }
});

userRouter.put("/resume/:id", async (req: Request, res: Response) => {
  try {
    const data = await userController.updateResume(req.params.id, req.body);
    if (!data) {
      res.status(404).send({ message: "User not found" });
    }
    return res.status(200).send({ message: "Resume updated" });
  } catch (error) {
    res.send(500).send(error);
  }
});

export default userRouter;
