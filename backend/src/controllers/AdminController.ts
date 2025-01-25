import {prisma} from '../db/db';
import {Request, Response} from 'express';



interface Product {
    name : string,
    description : string,
    price : string,
    images? : string[]
}

const adminController = {
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

            //store the files in a folder with name similar to the product id
            //store the paths to all the images stored in the directory into an array
            //store that array into the database;

            const newProduct : Product = {
                name : req.body.name,
                description : req.body.description,
                price : req.body.price
            }

            const success = await prisma.product.create({
                data : newProduct
            });

            const newProductID = success.id;


            
            if(success){
                res.status(200).json({message : "Product added successfully", addedProduct : success });

            }else{
                res.status(404).json({message : "some issue in adding new product"});
            }
        } catch (error) {
            res.status(500).json({message : "Error while adding a new product into the database" , error : error});
        }
    }
}

export default adminController;