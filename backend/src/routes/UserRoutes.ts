import {Router, Request, Response} from 'express'
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
router.get('/', (req, res)=> {
    res.send('whats wup');
})
router.post('/product',uploads.array('images',3), adminController.addNewProduct );

export default router;


/**
 * tasks we have to do 
 * 
 * ADMIN 
 *      store new products
 *      delete a product
 *      edit a product entry
 *      
 *      get all products -  DONEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
 *      
 *      get all orders
 *      
 */