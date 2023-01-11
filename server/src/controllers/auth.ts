import { Response, Request } from "express";
import { CreateUserInput } from "../userSchema/schema";
import { createUser } from "../service/users";
import sendEmail from "../utils/mailer";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  const body = req.body;

  try {
    const user = await createUser(body);

    await sendEmail({
      from: "joshrick16.abellera",
      to: user.email,
      subject: "Please verify your account",
      text: `verification code ${user.verificationCode}. id: ${user._id}`,
    });

    res.send("User Succesfully created");
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(409).send("Account already exist");
    }
    return res.status(500).send(e);
  }
}

const signUp = async (req: Request, res: Response) => {
  res.send("Register Route");
};

const login = async (req: Request, res: Response) => {
  res.send("Login Route");
};
