import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Book from '../models/Book';

//create Book
const createBook = (req: Request, res: Response, next: NextFunction) => {
    const { title, author } = req.body;

    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title,
        author
    });

    return book
        .save()
        .then((book) => res.status(201).json({ book }))
        .catch((error) => res.status(500).json({ error }));
};

//read Book by ID
const readBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return Book.findById(bookId)
        .populate('author')
        .select('-__v')
        .then((book) => (book ? res.status(200).json({ book }) : res.status(404).json({ message: 'Not Found' })))
        .catch((error) => res.status(500).json({ error }));
};

//read All Books
const readAllBook = (req: Request, res: Response, next: NextFunction) => {
    return Book.find()
        .populate('author')
        .select('-__v')
        .then((book) => res.status(200).json({ book }))
        .catch((error) => res.status(500).json({ error }));
};

//update Book
const UpdateBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return Book.findById(bookId)
        .then((book) => {
            if (book) {
                book.set(req.body);

                return book
                    .save()
                    .then((book) => res.status(201).json({ book }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'Not Found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

//delete Book
const DeleteBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return Book.findByIdAndDelete(bookId)
        .then((book) => (book ? res.status(201).json({ message: 'Deleted Book' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default {
    createBook,
    readAllBook,
    readBook,
    UpdateBook,
    DeleteBook
};
