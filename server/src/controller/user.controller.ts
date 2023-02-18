import { Request, Response } from "express";
import config from "config";
import { CreateUserInput } from "../schema/user.schema";
import { createSession } from "../service/session.service";
import { createUser } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";
import logger from "../utils/logger";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);

    const session = await createSession(user._id, req.get("user-agent") || "");

    // create an access token

    const accessToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: config.get("accessTokenTtl") } // 15 minutes
    );

    // create a refresh token
    const refreshToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: config.get("refreshTokenTtl") } // 15 minutes
    );

    // return access & refresh tokens

    res.cookie("accessToken", accessToken, {
      maxAge: 900000, // 15 mins
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: false,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 3.154e10, // 1 year
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: false,
    });

    const sucess = "User created successfully";

    return res.status(201).json({
      sucess,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getCurrentUser(req: Request, res: Response) {
  const email = res.locals.user.email;
  const id = res.locals.user._id;
  const name = res.locals.user.name;
  const createdAt = res.locals.user.createdAt;
  const updataAt = res.locals.user.updataAt;
  const session = res.locals.user.session;

  return res.json({
    data: {
      user: {
        id,
        email,
        name,
        createdAt,
        updataAt,
        session,
      },
    },
  });
}
