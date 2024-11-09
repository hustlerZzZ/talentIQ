import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      status: "failed",
      msg: "Please enter a valid email and name",
    });
  }
};
