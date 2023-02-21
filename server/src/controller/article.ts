import { Request, Response } from "express";
import { stripe } from "../utils/stripe";
import config from "config";
import Article from "../models/article";
import log from "../utils/logger";

export async function articleSession(req: Request, res: Response) {
  const customerId = res.locals.user.stripeCustomerId;
  const user = res.locals.user;

  if (user) {
    Article.create({
      title: "How to take control of your life",
      imageUrl:
        "https://images.unsplash.com/photo-1508345228704-935cc84bf5e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2hhaW58ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
      content:
        "You are the only person that could make this work and your also the only person who could f**k this up",
      access: "Standard",
    });

    Article.create({
      title: "History is define by the winner",
      imageUrl:
        "https://images.unsplash.com/photo-1525711857929-4272fb4a040f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d2FyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
      content:
        "Why do you think, every history has a winner and a loser, that the bad guys are bad and the good guy are good ",
      access: "Premium",
    });
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

    if (plan === "Basic") {
      const articles = await Article.find({ access: "Basic" });
      return res.json(articles);
    } else if (plan === "Standard") {
      const articles = await Article.find({
        access: { $in: ["Basic", "Standard"] },
      });
      return res.json(articles);
    } else {
      const articles = await Article.find({});
      return res.json(articles);
    }
    res.json(plan);
  } else {
    log.error(`Invalid User`);
  }
}
