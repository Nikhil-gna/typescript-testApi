import express from 'express';
import controller from '../controllers/Author';
import { Schema, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schema.author.create), controller.createAuthor);
router.get('/get/', controller.readAllAuthor);
router.get('/get/:authorId', controller.readAuthor);
router.patch('/update/:authorId', ValidateSchema(Schema.author.update), controller.UpdateAuthor);
router.delete('/delete/:authorId', controller.DeleteAuthor);

export = router;
