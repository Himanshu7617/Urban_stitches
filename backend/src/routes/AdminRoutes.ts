import {Router} from 'express'
import adminController from '../controllers/AdminController';
import multer from 'multer';


const router = Router();
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        return cb(null, './uploads');
    },
    filename : (req, file, cb) => {
        return cb(null, `${Date.now() }-${file.originalname}`);
    }
})

const uploads = multer({storage : storage});


router.post('/product',uploads.array('images',3), adminController.addNewProduct );
router.get('/product', adminController.getAllProducts);
router.get('/order', adminController.getAllOrders);
router.get('/users', adminController.getAllUsers);


export default router;
