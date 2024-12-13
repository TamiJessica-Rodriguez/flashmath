import express from "express";
import { getImage, uploadImage } from "./images-handlers";

export const imagesRouter = express.Router();

imagesRouter.get("/:id", getImage);
imagesRouter.post("/", uploadImage);
