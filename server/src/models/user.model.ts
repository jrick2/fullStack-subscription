import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { stripe } from "../utils/stripe";

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  stripeCustomerId: string;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    stripeCustomerId: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let user = this as UserDocument;

  if (!user.isModified("password")) {
    return next();
  }

  const email = user.email;
  const customer = await stripe.customers.create(
    { email },
    {
      apiKey: config.get<string>("stripe_Secret_Key"),
    }
  );

  user.stripeCustomerId = customer.id;
  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
