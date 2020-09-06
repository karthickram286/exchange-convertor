import Router from 'express';
import CountryController from '../controller/country.controller';

const router = Router();
const countryController = new CountryController();

router.get('/get/:name', countryController.getCountries);

export default router;