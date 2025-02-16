import {prisma} from '../db/db';
import {Request, Response} from 'express';
import { Prisma } from '@prisma/client';




const adminController = {
    getAllUsers : async (req : Request, res : Response ) => {
        try {
            const allusers = await prisma.user.findMany({
                include : {
                    cart : true
                }
            });

            res.status(200).json(allusers)
        } catch (error) {
            res.status(500).json(error);
        }
    }, 
    getAllProducts : async (req : Request, res: Response) => {
        try {
            const allProducts = await prisma.product.findMany();
            res.status(200).json(allProducts);
        } catch (error) {
            res.status(500).json({message : "Error while getting all products form the database", error : error});
        }
        
    },
    
    addNewProduct : async ( req : Request, res: Response ) => {

        try {

            //store the a folder files in with name similar to the product id
            //store the paths to all the images stored in the directory into an array
            //store that array into the database;
            

            const newProduct : Prisma.ProductCreateInput = {
                name : req.body.name,
                description : req.body.description,
                price : req.body.price,
                quantity : Number(req.body.quantity)
            }

            const success = await prisma.product.create({
                data : newProduct
            });

            const newProductID = success.id;
            
            const filesArray = Array.isArray(req.files) ? req.files : Object.values(req.files || {}).flat();
            const newProductFilepaths = filesArray.map(i => newProductID+'---'+i.filename);
            
            
            
            let result = await prisma.product.update({
                where : {
                    id : newProductID
                },
                data : {
                    images : newProductFilepaths
                }
            });
            

            
            if(success && result ){
                res.status(200).json({message : "Product added successfully", addedProduct : result });

            }else{
                res.status(404).json({message : "some issue in adding new product"});
            }
        } catch (error) {
            res.status(500).json({message : "Error while adding a new product into the database" , error : error});
        }
    },

    getAllOrders : async ( req : Request, res : Response ) => {
        try {
            const allOrders = await prisma.order.findMany();
            console.log(allOrders);
            res.status(200).json(allOrders);
        } catch (error) {
            console.error(error);
            res.status(400).json({message : "error while getting all orders", error : error});
        }
    }
}

export default adminController;