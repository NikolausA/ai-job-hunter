import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "@/server/trpc/root";
import { createTRPCContext } from "@/server/trpc/context";
import { NextApiRequest, NextApiResponse } from "next";

const nextApiHandler = createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  return nextApiHandler(req, res);
}
