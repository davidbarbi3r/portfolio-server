import express from 'express';
import controller from '../controllers/User';
import {Schemas, ValidateSchema} from "../middleware/ValidateSchema"
import extractFirebaseInfo from '../middleware/extractFirebaseInfo';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.user.create), extractFirebaseInfo, controller.createUser);
router.get("/validate", extractFirebaseInfo, controller.validateUser)
router.post("/login", extractFirebaseInfo, controller.loginUser)
router.get('/get/:userId', controller.readUser);
router.get('/get', controller.readAll);
router.patch('/update/:userId', ValidateSchema(Schemas.user.update), controller.updateUser);
router.delete('/delete/:userId', controller.deleteUser);

export = router;