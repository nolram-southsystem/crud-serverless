// src/routes.ts

import express, { Request, Response } from 'express';

import { CreateUser } from './app/services/users/CreateUser';
import { GetUser } from './app/services/users/GetUser';

import { User } from './domain/entities/users';

const router = express.Router();

router.get('/hello', (request: Request, response: Response) => {
    response.json({
        status: 'success',
        data: 'Hello World!!'
    });
});

router.post('/users', (request: Request, response: Response) => {
    const { type, name, birthday } = request.body;
    if (typeof type !== 'string') {
        response.status(400).json({ error: '"type" must be a string' });
    } else if (typeof name !== 'string') {
        response.status(400).json({ error: '"name" must be a string' });
    }
    const createUser: CreateUser = new CreateUser();

    const user: User = createUser.createUser(name, type, birthday);
    response.status(200).json(user);
});

router.get('/users', (request: Request, response: Response) => {
    const getUser: GetUser = new GetUser();
    const promise = getUser.getUsers();
    promise
        .then((data) => {
            let users: User[] = [];
            data.Items.forEach((element) => {
                const user: User = {
                    userId: element.userId,
                    name: element.name,
                    type: element.type,
                    birthday: element.birthday
                };
                // console.log(user);
                users.push(user);
            });
            response.status(200).json(users);
        })
        .catch((err: string) => {
            console.error(err);
        });
});

export default router;
