import { Express, Request, Response } from "express";
import { articleSession } from "./controller/article";

import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "./controller/session.controller";
import { stripeHandler, stripeSession } from "./controller/stripe";
import {
  createUserHandler,
  getCurrentUser,
} from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";

import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  app.get("/api/me", requireUser, getCurrentUser);

  app.post(
    "/api/login",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/login", requireUser, getUserSessionsHandler);

  app.delete("/api/login", requireUser, deleteSessionHandler);

  app.get("/api/prices", requireUser, stripeHandler);

  app.post("/api/session", requireUser, stripeSession);

  app.get("api/articles", requireUser, articleSession);
}

export default routes;
