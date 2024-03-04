import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import * as coordController from "../controllers/coordinate.controller";

interface Coordinate {
  id: string;
  createdAt: string;
  lat: number;
  lng: number;
}

const coordRouter = Router();

coordRouter.get("/", async (req: Request, res: Response) => {
  try {
    const data = await coordController.getCoordinates();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

coordRouter.post("/", async (req: Request, res: Response) => {
  try {
    const Cord = req.body;
    Cord.id = uuidv4();
    Cord.createdAt = new Date().toISOString();
    const data = await coordController.createCoordinate(Cord);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

coordRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await coordController.deleteCoordinate(id);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default coordRouter;
