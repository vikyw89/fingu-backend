import { NextFunction, Request, Response } from "express";
import { prisma } from "../../utils/prisma";

/**
 * Retrieves all users from the database and sends a JSON response.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @return {Promise<void>} - A promise that resolves to nothing.
 */
export const getAllUsers = async(req:Request,res:Response,next:NextFunction) => {
    try {
        const allUsers = await prisma.user.findMany()
        res.json(allUsers)
    }
    catch (err) {

        console.log(err)
    
    }
}