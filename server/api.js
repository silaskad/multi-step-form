import express from 'express'
import productRoute from './routes/productRoute.js'
import formDataRoute from './routes/formDataRoute.js'

const router = express.Router();

router.use('/product', productRoute);
router.use('/submit', formDataRoute);

export default router