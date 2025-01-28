import { Request, Response } from "express";
import { prisma } from "../db/db";
import { User } from "../types/Types";


const userController = {
    createUser : async (req : Request, res : Response ) => {

        const newUser : User = {
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        }
        try {
            const user = await prisma.user.create({
                data : newUser
            })
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json(error);
        }
    },
    getAllProducts : async (req : Request, res : Response) => {

        try {
            const allProducts = await prisma.product.findMany();
            res.status(200).json(allProducts);
        } catch (error) {
            console.error(error);
            res.status(404).json({message : "error getting all products", error : error});
        }

    },
    addToCart : async (req : Request, res : Response) => {
        try {

            

            // const user = await prisma.user.update({
            //     data : {
            //         cart : ['gdg', 'ggdg']
            //     }, 
            //     where : {
            //         id : req.body.user.id
            //     }
            // })
        } catch (error) {
            
        }
    },
    orderProduct : async (req : Request, res : Response) => {

    },
    payment : async (req : Request, res : Response) => {

    },
}


export default userController;