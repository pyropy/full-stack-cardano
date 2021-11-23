import { Response, NextFunction } from "express";
import HttpStatusCodes from "http-status-codes";
import Request from "../types/Request";
// @ts-ignore
import Web3Token from "web3-cardano-token/dist/node";

export default async function(req: Request, res: Response, next: NextFunction) {
  // Get token from header
  const token = req.header("Authorization");

  // Check if no token
  if (!token) {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    const { address } = await Web3Token.verify(token)
    req.userAddr = address;
    next();
  } catch (err) {
    console.log(err)
    res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ msg: "Token is not valid" });
  }
}
