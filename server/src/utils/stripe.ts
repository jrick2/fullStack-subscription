import Stripe from "stripe";
import config from "config";

export const stripe = new Stripe(config.get<string>("stripe_Secret_Key"), {
  apiVersion: "2022-11-15",
});
