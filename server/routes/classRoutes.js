import express from 'express';
import {hello, getStudents} from '../controllers/classController.js'
const router = express.Router();


router.get('/students',getStudents)

router.get('/',hello)

// get -> sending data from backend
// post -> receiving data eg a user has filled a form
//put -> updating/editing data in the database
//delete -> deleting data from the databse
//'/' -> path or endpoint
// (req,res) => {} -> req: request(used when rceiving data)
//                    res: response(data being sent),used like a return



export default router;