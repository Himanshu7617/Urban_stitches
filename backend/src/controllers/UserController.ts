import { Request, Response } from "express";
import { prisma } from "../db/db";
import { Prisma } from "@prisma/client";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from 'crypto'
dotenv.config()

const userController = {
    createUser : async (req : Request, res : Response ) => {

        const newUser : Prisma.UserCreateInput = {
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
            console.log(req.headers);
            const allProducts = await prisma.product.findMany();
            res.status(200).json(allProducts);
        } catch (error) {
            console.error(error);
            res.status(404).json({message : "error getting all products", error : error});
        }

    },
    addToCart : async (req : Request, res : Response) => {
        try {

            //in request i'll get the product info probably first extract the id of the product 
            const productID = req.body.productID;
            const userID  = req.body.userID;

            //now i need to add this id to the user's cart
            const createCart = await prisma.userCart.create({
                
                data : {
                    userId : userID,
                    productId : productID
                }
            });
            res.status(200).json({message : 'added to cart'})
            
        } catch (error) {
            res.status(404).json(error);
        }
    },
    getProductById : async( req : Request, res: Response) => {
         try {
            const product = await prisma.product.findUnique({
                where : {
                    id : req.params.id
                }
            })
            res.status(200).json(product);
         } catch (error) {
            res.status(500).json(error);
         }
    },
    getCartProduct : async (req : Request, res : Response ) => {
        try {
            const userID = req.body.userID;

            const cartProducts = await prisma.user.findMany({
                where : {
                    id : userID
                },
                select : {
                    cart : {
                        select : {
                            productId : true
                        }
                    }
                }
            });
            
            res.status(200).json({list : Object.values(cartProducts[0]).flat().map( i => i.productId)});
        } catch (error) {
            res.status(404).json(error);
        }
    },
    orderProduct : async (req : Request, res : Response) => {
        try {

            
        const newOrder = {
            quantity : req.body.quantity,
            totalPrice : req.body.price,
            productId : req.body.productID

        }
        const createOrder = await prisma.order.create({
            data : {
                ...newOrder,
                User : {
                    connect : {
                        id : req.body.userID
                    }
                },
                
            }
        })

        res.status(200).json({message : "ordered", newOrder : createOrder});
            
        } catch (error) {
            res.status(404).json(error);
        }

    },
    getAllUserOrders : async (req : Request, res: Response ) => {
        try {
            const allOrder = await prisma.order.findMany();

            res.status(200).json(allOrder);
        } catch (error) {
           res.status(404).json(error); 
        }
    },
    getOrder : async (req : Request, res : Response) => {
        try {
            const instance = new Razorpay({
                key_id : <string>process.env.RAZOR_PAY_TEST_KEY_ID,
                key_secret : <string>process.env.RAZOR_PAY_TEST_SECRET_KEY

            });

            const options = req.body;
            const order = await instance.orders.create(options);

            // if(!order) { 
            //     return res.status(404).json({message : "Something went wrong while creating the order by razorpay"});
            // }

            res.status(200).json(order); 
        } catch (error) {
            res.status(500).json(error);
        }
    },

    validatePaymentSuccess : async (req : Request, res : Response ) => {
        try {

            const {razorpay_order_id , razorpay_payment_id, razorpay_signature } = req.body;

            const sha = crypto.createHmac("sha256",<string>process.env.RAZOR_PAY_TEST_SECRET_KEY, );
            sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
            const digest = sha.digest("hex");
            if(digest !== razorpay_signature){
                res.status(404).json({msg : "transaction is not legit "});
            }

            res.status(200).json({
                message : "success",
                order_id : razorpay_order_id, 
                payment_id : razorpay_payment_id
            })
            
        } catch (error) {
            res.status(500).send("Internal server error ");
        }
    }
}


export default userController;