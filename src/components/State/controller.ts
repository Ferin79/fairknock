import { NextFunction, Request, Response } from "express";
import { State } from "./model";
export const getStatesFromCountryId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const states = await State.find({
      where: { country: id },
      order: { name: "ASC" },
    });

    res.status(200).json({
      success: true,
      states,
    });
  } catch (error) {
    return next(error);
  }
};
