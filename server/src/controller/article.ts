import { Request, Response } from "express";
import { findUser } from "../service/user.service";
import { stripe } from "../utils/stripe";
import config from "config";
import ArticleModel from "../models/article";
import article from "../models/article";

export async function articleSession(req: Request, res: Response) {
  const customerId = res.locals.user.stripeCustomerId;

  const subscriptions = await stripe.subscriptions.list(
    {
      customer: customerId,
      status: "all",
      expand: ["data.default_payment_method"],
    },
    {
      apiKey: config.get<string>("stripe_Secret_Key"),
    }
  );

  if (!subscriptions.data.length) return res.json([]);

  //@ts-ignore
  const plan = subscriptions.data[0].plan.nickname;
  res.json(plan);
  if (plan === "Basic") {
    const articles = await article.find({ access: "Basic" });
    return res.json(articles);
  } else if (plan === "Standard") {
    const articles = await article.find({
      access: { $in: ["Basic", "Standard"] },
    });
    return res.json(articles);
  } else {
    const articles = await article.find({});
    return res.json(articles);
  }
}
