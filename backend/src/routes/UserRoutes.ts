import {Router} from 'express'
import userController from '../controllers/UserController';

const router = Router();

router.post('/adduser', userController.createUser);
router.post('/cart', userController.addToCart);
router.get('/cart', userController.getCartProduct);
router.post('/order', userController.orderProduct);
router.get('/product/:id', userController.getProductById);
router.get('/order', userController.getAllUserOrders);
router.post('/razorpay', userController.getOrder);
router.post('/razorpay/validate', userController.validatePaymentSuccess);
export default router;
