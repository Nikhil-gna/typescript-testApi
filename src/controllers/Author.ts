import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Author from '../models/Author';

//create Author
const createAuthor = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    const author = new Author({
        _id: new mongoose.Types.ObjectId(),
        name
    });

    return author
        .save()
        .then((author) => res.status(201).json({ author }))
        .catch((error) => res.status(500).json({ error }));
};

//read Author by ID
const readAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    return Author.findById(authorId)
        .then((author) => (author ? res.status(200).json({ author }) : res.status(404).json({ message: 'Not Found' })))
        .catch((error) => res.status(500).json({ error }));
};

//read All Authors
const readAllAuthor = (req: Request, res: Response, next: NextFunction) => {
    return Author.find()
        .then((author) => res.status(200).json({ author }))
        .catch((error) => res.status(500).json({ error }));
};

//update Author
const UpdateAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    return Author.findById(authorId)
        .then((author) => {
            if (author) {
                author.set(req.body);

                return author
                    .save()
                    .then((author) => res.status(201).json({ author }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'Not Found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

//delete Author
const DeleteAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    return Author.findByIdAndDelete(authorId)
        .then((author) => (author ? res.status(201).json({ message: 'Deleted Author' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createAuthor, readAllAuthor, readAuthor, UpdateAuthor, DeleteAuthor };
