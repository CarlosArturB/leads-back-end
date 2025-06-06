import { Router } from 'express';
import { createUser } from '../services/user';
import { createleads, getAllLeads } from './../services/Leads';
import { createlp, getAllLp } from './../services/lp';

export const mainRouter = Router();

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

// mainRouter.get('/users', async (req, res) => {
//     const result = await getAllUsers();
//     res.json(result);
// });

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

mainRouter.get('/leads', async (req, res) => {
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