import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email address"),
    username: string({
      required_error: "Username is required",
    }).min(3, "USername is too short - min of 3 characters"),
    password: string({
      required_error: "Password is required",
    }).min(7, "Password is too short - min of 7 characters"),
    passwordConfirmation: string({
      required_error: "Password confirmation is required",
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Password and confirmation",
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];
