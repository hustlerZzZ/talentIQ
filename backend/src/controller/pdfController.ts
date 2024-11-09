import { StatusCodes } from "../enums/statusCodes";
import { Request, Response } from "express";

// const prisma = new PrismaClient();
//
// export const uploadAvatar = async (req: Request, res: Response) => {
//   try {
//     const user = await prisma.user.findUnique({
//       where: { id: req.user?.id },
//     });
//
//     if (!user) {
//       return res.status(StatusCodes.NOT_FOUND).json({
//         status: "failed",
//         msg: "User not found",
//       });
//     }
//
//     if (req.file) {
//       await prisma.user.update({
//         where: {
//           id: user.id,
//         },
//         data: {
//           avatar: req.file.path,
//         },
//       });
//
//       res.status(StatusCodes.OK).json({
//         status: "success",
//         user,
//       });
//     } else {
//       res.status(StatusCodes.BAD_REQUEST).json({
//         status: "failed",
//         msg: "No file uploaded",
//       });
//     }
//   } catch (e) {
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       status: "failed",
//       msg: "Avatar upload failed",
//     });
//   }
// };
