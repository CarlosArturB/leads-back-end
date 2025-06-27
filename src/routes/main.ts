import { Router } from 'express';
import { createUser, getAllUsers } from '../services/user';
import { createleads, getAllLeads } from './../services/Leads';
import { createlp, getAllLp } from './../services/lp';
import { login } from '../controllers/authController';
import { authenticationFilter } from '../filters/authenticationFilter';

export const mainRouter = Router();

mainRouter.post('/login', login);

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

// Users
mainRouter.post('/createuser', async (req, res) => {
    const user = await createUser({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    res.json(user);
});

 mainRouter.get('/users', async (req, res) => {
     const result = await getAllUsers();
     res.json(result);
});

//Leads
mainRouter.post('/createleads', async (req, res) => {
    const user = await createleads({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        leadorigin: req.body.leadorigin
    });
    res.json(user);
});

mainRouter.get('/leads', authenticationFilter, async (req, res) => {
    console.log(req.headers.authorization);
    const result = await getAllLeads();
    res.json(result);
});

//Landing Pages
mainRouter.post('/createlp', async (req, res) => {
    const user = await createlp({
        name: req.body.name,
        url: req.body.url,
        status: req.body.status
    });
    res.json(user);
});

mainRouter.get('/lps', async (req, res) => {
    const result = await getAllLp();
    res.json(result);
});