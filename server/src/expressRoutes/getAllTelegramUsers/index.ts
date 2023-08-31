import { NextFunction, Request, Response } from "express";
import { prisma } from "../../utils/prisma";

/**
 * Retrieves all Telegram users from the database and sends a JSON response.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @return {Promise<void>} - This function does not return anything.
 */
export const getAllTelegramUsers = async (req:Request,res:Response, next:NextFunction) => {
    try {
        
        const allTelegramUsers = await prisma.telegram.findMany()
        res.json(allTelegramUsers)
    
    }
    catch (err) {

        console.log(err)
        
    }
}