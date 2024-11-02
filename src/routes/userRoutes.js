import express from 'express';
import User from '../models/User.js';
import {upload} from '../utils/utilsImage.js'

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.json({ message: 'Fetching users...' });
});

userRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const user = await User.getById(id);
        await user.retrive();
        if (!user) {
            res.status(404).send('User not found');
        } else {
            res.status(200).send(user);
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

userRouter.post('/profile', upload.single('profile'), async (req, res) => {
    const data = req.body;
    try {
        const user = req.user;
        user.firstname = data.firstname;
        user.lastname = data.lastname;
        user.dateOfBirth = data.dateOfBirth;
        user.phoneNumber = data.phoneNumber;
        if (req.image) {
            user.profile = req.image;
        }
        await user.update();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

export default userRouter;
