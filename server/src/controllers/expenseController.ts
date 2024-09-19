import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
// import { sync } from "rimraf";


const prisma = new PrismaClient();

export const getExpensesByCategory= async(req:Request,res:Response) : Promise<void> => {
    try{
        const getExpenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany(
       {
        orderBy :{
            date:"desc",
        },
       }
        );
       const expenseByCategorySummary = getExpenseByCategorySummaryRaw.map (
        (item) => ({
            ...item,
            amount:item.amount.toString(),
        })
       );
       res.json(expenseByCategorySummary);
    }catch(error){
        res.status(500).json({message:"Error retrieving expenses by category"});
    }
}