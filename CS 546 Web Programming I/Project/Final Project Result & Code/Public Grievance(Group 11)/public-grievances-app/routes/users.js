// const express = require('express');
// const router = express.Router();
// const data = require('../data');
// const usersData = data.users;
// const { ObjectId } = require('mongodb');
// const session = require('express-session');
// const bcrypt = require('bcryptjs');

// router.get('/:id', async (req, res) => {
//     try {
//         let user = await usersData.getUserById(req.params.id);
//         if (user === null || user === undefined)
//             res.status(404).json({ error: 'user not found' })
//         else
//             res.json(user);
//     } catch (e) {
//         res.status(404).json({ error: 'user not found' });
//     }
// });
// router.get('/', async (req, res) => {
//     try {
//         let userList = await usersData.getAllUsers();
//         res.json(userList);
//     } catch (e) {
//         res.sendStatus(400);
//     }
// });
// router.post('/', async (req, res) => {
//     let userInfo = req.body;
//     if (!userInfo) {
//         res.status(400).json({ error: 'You must provide data to create a user' });
//         return;
//     }
//     if (!userInfo.firstName) {
//         res.status(400).json({ error: 'You must provide a first name' });
//         return;
//     }
//     if (!userInfo.lastName) {
//         res.status(400).json({ error: 'You must provide a last name' });
//         return;
//     }
//     if (!userInfo.email) {
//         res.status(400).json({ error: 'You must provide an email' });
//         return;
//     }
//     if (!userInfo.city) {
//         res.status(400).json({ error: 'You must provide city' });
//         return;
//     }
//     if (!userInfo.hashedPassword) {
//         res.status(400).json({ error: 'You must provide password' });
//         return;
//     }
//     if (!userInfo.state) {
//         res.status(400).json({ error: 'You must provide state' });
//         return;
//     }
//     try {
//         const newUser = await usersData.addUser(userInfo.firstName, userInfo.lastName, userInfo.email, userInfo.hashedPassword, userInfo.city, userInfo.state);
//         //res.json(newUser);
//         req.session.user = newUser.email
//         req.session.AuthCookie = req.sessionID;
//         let sessionInfo = req.session.user
//         res.render('grievances/profile', { newUser: newUser, sessionInfo: sessionInfo });
//     } catch (e) {
//         res.sendStatus(400);
//     }
// });

// router.put('/:id', async (req, res) => {
//     const updatedData = req.body;
//     if (!updatedData.firstName || !updatedData.lastName || !updatedData.email || !updatedData.city || !updatedData.state) {
//         res.status(400).json({ error: 'Please provide all the user information to update your registration' });
//         return;
//     }
//     try {
//         await usersData.getUserById(req.params.id);
//     } catch (e) {
//         res.status(404).json({ error: 'Registered User Not not found to Update the details' });
//         return;
//     }

//     try {
//         const updatedUser = await usersData.updateUser(req.params.id, updatedData.firstName, updatedData.lastName, updatedData.email, updatedData.city, updatedData.state);
//         res.json(updatedUser);
//     } catch (e) {
//         res.status(500).json({ error: e });
//     }
// });

// router.patch('/:id', async (req, res) => {
//     const requestBody = req.body;
//     let updatedObject = {};
//     try {
//         const oldPost = await usersData.getUserById(req.params.id);
//         if (requestBody.firstName && requestBody.firstName !== oldPost.firstName) updatedObject.firstName = requestBody.firstName;
//         if (requestBody.lastName && requestBody.lastName !== oldPost.lastName) updatedObject.lastName = requestBody.lastName;
//         if (requestBody.email && requestBody.email !== oldPost.email) updatedObject.email = requestBody.email;
//         if (requestBody.city && requestBody.city !== oldPost.city)
//             updatedObject.city = requestBody.city;
//         if (requestBody.state && requestBody.state !== oldPost.state)
//             updatedObject.state = requestBody.state;
//     } catch (e) {
//         res.status(404).json({ error: 'User not found to modify the record' });
//         return;
//     }

//     try {
//         const updatedUser = await usersData.updateUser(req.params.id, requestBody.firstName, requestBody.lastName, requestBody.email, requestBody.city, requestBody.state);
//         res.json(updatedUser);
//     } catch (e) {
//         res.status(500).json({ error: e });
//     }
// });

// router.delete('/:id', async (req, res) => {
//     if (!req.params.id) {
//         res.status(400).json({ error: 'You must Supply id to delete' });
//         return;
//     }
//     try {
//         await usersData.getUserById(req.params.id);
//     } catch (e) {
//         res.status(404).json({ error: 'User not found' });
//         return;
//     }
//     try {
//         await usersData.removeUser(req.params.id);
//         res.sendStatus(200);
//     } catch (e) {
//         res.status(500).json({ error: e });
//     }
// });

// module.exports = router;
