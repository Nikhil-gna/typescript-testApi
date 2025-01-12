import express from 'express';
import controller from '../controllers/Book';
import { Schema, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schema.book.create), controller.createBook);
router.get('/get/', controller.readAllBook);
router.get('/get/:bookId', controller.readBook);
router.patch('/update/:bookId', ValidateSchema(Schema.book.update), controller.UpdateBook);
router.delete('/delete/:bookId', controller.DeleteBook);

export = router;
