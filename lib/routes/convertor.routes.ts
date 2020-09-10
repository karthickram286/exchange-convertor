import Router from 'express';
import ConvertorController from '../controller/convertor.controller';

const router = Router();
const convertorController = new ConvertorController();

router.post('/currency', convertorController.convertToBaseCurrency);

export default router;