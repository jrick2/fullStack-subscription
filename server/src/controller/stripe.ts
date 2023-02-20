import { Request, Response } from "express";
import config from "config";
import { stripe } from "../utils/stripe";

export async function stripeHandler(req: Request, res: Response) {
  const prices = await stripe.prices.list({
    apiKey: config.get<string>("stripe_Secret_Key"),
  });

  return res.json(prices);
}

export async function stripeSession(req: Request, res: Response) {
  const user = res.locals.user;
  const localHost = config.get<string>("origin");
  const session = await stripe.checkout.sessions.create(
    {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: req.body.priceId, quantity: 1 }],
      success_url: `${localHost}/articles`,
      cancel_url: `${localHost}/articlePlan`,
      customer: user.stripeCustomerId,
    },
    { apiKey: config.get<string>("stripe_Secret_Key") }
  );

  return res.json(session);
}
