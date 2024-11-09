import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      status: "failed",
      msg: "Please enter a valid email and name",
    });
  }

  const newUser = await prisma.user.create({
    data: {
      email,
      createdAt: new Date(),
    },
  });

  return res.status(201).json({
    status: "success",
    newUser,
  });
};
