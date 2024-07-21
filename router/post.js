import { Router } from "express";
import postController from "../controller/post.js";
import { isAuth } from "../middleware/auth.js";

export const post = Router();

post.route("/").get(postController.getAll).post(isAuth, postController.crate);
post
  .route("/:id")
  .get(postController.getOne)
  .put(isAuth, postController.update)
  .delete(isAuth, postController.delete);
