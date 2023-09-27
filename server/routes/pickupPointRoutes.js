import express from 'express';
import { 
    getPickupPoints,
    getPickupPoint, 
    createPickupPoint, 
    updatePickupPoint,
    deletePickupPoint,
} from '../controllers/pickupPointController.js'

const router = express.Router();

router.get('/pickup-points', getPickupPoints);// getting all
router.get('/pickup-points/:id', getPickupPoint);// getting one
router.post('/pickup-points/create', createPickupPoint);//creating one
router.post('/pickup-points/update/:id', updatePickupPoint);//updating one
router.post('/pickup-points/delete/:id', deletePickupPoint);// deleting one


export default router;