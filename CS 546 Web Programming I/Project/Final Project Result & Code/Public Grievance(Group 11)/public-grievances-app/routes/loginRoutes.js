const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;
const issuesData = data.issues;
const xss = require('xss');

// All Get Methods


router.get('/', async (req, res) => {
    try {
        if (req.session.user === undefined) {
            res.render('grievances/index');
        } else {
            res.redirect('userhome');
        }

    } catch (error) {
        res.status(401).json({ error: "Page Not Found" });
    }

});

router.get('/login', async (req, res) => {
    try {
        if (req.session.user === undefined) {
            res.render('grievances/login');
        }
        else {
            res.redirect('userhome');
        }

    } catch (error) {
        res.status(401).json({ error: "Page Not Found" });
    }

});

router.get('/adminLogin', async (req, res) => {
    try {
        res.render('grievances/adminLogin');
    } catch (error) {
        res.status(401).json({ error: "Page Not Found" });
    }

});

router.get('/signup', async (req, res) => {
    try {
        if (req.session.user === undefined) {
            res.render('grievances/signup');
        }
        else {
            res.redirect('userhome');
        }

    } catch (error) {
        res.status(401).json({ error: "Page Not Found" });
    }

});

// All Post Methods

router.post('/signup', async (req, res) => {
    let userInfo = req.body;

    const fn = xss(userInfo.firstName);
    const ln = xss(userInfo.lastName);
    const em = xss(userInfo.email);
    const ci = xss(userInfo.city);
    const hp = xss(userInfo.hashedPassword);
    const st = xss(userInfo.state);


    if (!userInfo) {
        res.status(400).json({ error: 'You must provide data to create a user' });
        return;
    }
    if (!fn) {
        res.status(400).json({ error: 'You must provide a first name' });
        return;
    }
    if (!ln) {
        res.status(400).json({ error: 'You must provide a last name' });
        return;
    }
    if (!em) {
        res.status(400).json({ error: 'You must provide an email' });
        return;
    }
    if (!ci) {
        res.status(400).json({ error: 'You must provide city' });
        return;
    }
    if (!hp) {
        res.status(400).json({ error: 'You must provide password' });
        return;
    }
    if (!st) {
        res.status(400).json({ error: 'You must provide state' });
        return;
    }
    try {
        const newUser = await usersData.addUser(fn, ln, em,hp,ci, st);
        //res.json(newUser);
        if (newUser === 1) {
            res.render('grievances/error', { title: "Error", message: "User with this email already exists" });
        }
        else {
            req.session.user = newUser.email
            req.session.AuthCookie = req.sessionID;
            return res.status(201).redirect("userhome");
        }
        //res.render('grievances/profile', { newUser: newUser, sessionInfo: sessionInfo });
    } catch (e) {
        res.render('grievances/error', { title: "Error", message: e });
    }

});

router.post('/login', async (req, res) => {
    try {
        console.log("Logging In")
        let login_form_parameters = req.body;
        const lemail = xss(login_form_parameters.email);
        const lpass = xss(login_form_parameters.password);
        let user_auth = await usersData.logInUser(lemail, lpass);
        //here hashpassword is actually password entered by the user!! It is not hashed
        if (user_auth != -1) {
            req.session.user = lemail;
            req.session.AuthCookie = req.sessionID; // alis for req.session.id;
            return res.status(201).redirect("userhome");
        } else {
            res.status(401).render('grievances/login', { message: "You entered wrong password" });
        }
    } catch (error) {
        res.status(401).json({ error: "Page Not Found" });
    }

});


router.post('/adminLogin', async (req, res) => {
    try {
        console.log("Admin Logging In")
        let login_form_parameters = req.body;
        const aemail = xss(login_form_parameters.email);
        const apass = xss(login_form_parameters.password);
        let user_auth = await usersData.logInAdmin(aemail, apass); // Admin Login function called
        //here hashpassword is actually password entered by the user!! It is not hashed
        if (user_auth != -1) {
            req.session.user = aemail;
            req.session.AuthCookie = req.sessionID; // alis for req.session.id;
            return res.status(201).redirect("adminHome");
        } else {
            res.status(401).render('grievances/adminLogin', { message: "You entered wrong password" });
        }
    } catch (error) {
        res.status(401).json({ error: "Page Not Found" });
    }

});

router.get('/adminHome', async (req, res) => {
    try {
        let issueList = await issuesData.getAllIssues();
        let sessionInfo = req.session.user;
        if (req.session.user === undefined) {
            res.redirect('/');
        }
        else {
            const user = await usersData.getUserByEmail(req.session.user)
            if (user.admin === true) {
                res.render('grievances/adminHome', { sessionInfo: sessionInfo, issueList: issueList });
            }
            else {
                res.redirect('/');
            }
        }
    } catch (error) {
        res.status(401).json({ error: "Page Not Found" });
    }

});

router.get('/userhome', async (req, res) => {
    try {
        let sessionInfo = req.session.user
        if (req.session.user === undefined) {
            res.render('grievances/index');
        }
        else {
            res.render('grievances/userhome', { sessionInfo: sessionInfo });
        }

    } catch (error) {
        res.status(401).json({ error: "Page Not Found" });
    }

});

router.post('/viewNearbyIssues', async (req, res) => {
    try {
        let sessionInfo = req.session.user;
        const issueInfo = req.body;
        let issueList = await issuesData.getNearbyIssues(issueInfo.latitude,
            issueInfo.longitude,
            issueInfo.radius);
        if (req.session.user === undefined) {
            res.render('grievances/index', { issueList: issueList, radius: issueInfo.radius });
        } else {
            res.render('grievances/userhome', { issueList: issueList, radius: issueInfo.radius });
        }
    } catch (error) {
        res.status(401).json({ error: "Page Not Found" });
    }

});

router.get('/logout', async (req, res) => {
    try {
        if (req.session.user === undefined) {
            res.redirect('/');
        }
        else {
            req.session.destroy();
            res.clearCookie('AuthCookie');
            res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
            res.redirect('/');
        }

    } catch (error) {
        res.status(401).json({ error: "Page Not Found" });
    }

});

// route to show User Profile

router.get('/profile', async (req, res) => {
    try {
        let sessionInfo = req.session.user
        if (req.session.user === undefined) {
            res.render('grievances/index');
        }
        else {
            const newUser = await usersData.getUserByEmail(req.session.user); //userId?
            res.render('grievances/profile', { newUser: newUser, sessionInfo: sessionInfo })
        }

    } catch (e) {
        res.render('grievances/error', { title: "error", message: e })
    }

});

// profile update Routes

router.get('/profileupdate', async (req, res) => {
    try {
        if (req.session.user === undefined) {
            res.render('grievances/index');
            return;
        }
        const newUser = await usersData.getUserByEmail(req.session.user);
        res.render('grievances/profileupdate', { newUser: newUser })
    } catch (e) {
        res.render('grievances/error', { title: "error", message: e })
    }

});

router.post('/profileupdate', async (req, res) => {
    if (req.session.user === undefined) {
        res.render('grievances/index');
        return;
    }
    const requestBody = req.body;
    const ufn = xss(requestBody.firstName);
    const uln = xss(requestBody.lastName);
    const uem = xss(requestBody.email);
    const uci = xss(requestBody.city);
    const ust = xss(requestBody.state);
    let updatedObject = {};
    try {
        const oldPost = await usersData.getUserByEmail(req.session.user);
        if (ufn && ufn !== oldPost.firstName) updatedObject.firstName = ufn;
        if (uln && uln !== oldPost.lastName) updatedObject.lastName = uln;
        if (uem && uem !== oldPost.email) updatedObject.email = uem;
        if (uci && uci !== oldPost.city)
            updatedObject.city = uci;
        if (ust && ust !== oldPost.state)
            updatedObject.state = ust;
    } catch (e) {
        res.status(404).json({ error: 'User not found to modify the record' });
        return;
    }

    try {
        const updatedUser = await usersData.updateUser(req.session.user, ufn, uln, uem, uci, ust);
        res.render('grievances/UserUpdateSuccessful', { newUser: updatedUser })
        // res.json(updatedUser);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

//view all my issues
router.get('/ViewAllMyIssues', async (req, res) => {
    try {
        if (req.session.user === undefined) {
            res.render('grievances/index');
        }
        else {
            const newUser = await usersData.getUserByEmail(req.session.user); //userId?
            let sessionInfo = req.session.user
            const issueByUserId = await issuesData.getIssuesByUserId(newUser._id)
            res.render('grievances/ViewAllMyIssues', { issueByUserId: issueByUserId, sessionInfo: sessionInfo })
        }
    } catch (e) {
        res.status(401).render('grievances/login', { message: "Please Login" });
    }

});

//update issues
router.get('/issueUpdate/:id', async (req, res) => {
    try {
        if (req.session.user === undefined) {
            return res.render('grievances/error', { title: "error", message: "User Not Logged In" })
        }
        const issue = await issuesData.getIssueById(req.params.id)
        res.render('grievances/issueUpdate', { issue: issue })
        // const newUser = await usersData.getUserByEmail(req.session.user);
        // res.render('grievances/profileupdate', { newUser: newUser })
    } catch (e) {
        res.render('grievances/error', { title: "error", message: e })
    }
});

router.post('/issueUpdate/:id', async (req, res) => {
    if (req.session.user === undefined) {
        return res.render('grievances/error', { title: "error", message: "User Not Logged In" })
    }
    const requestBody = req.body;
    let updatedObject = {};
    try {
        const oldIssue = await issuesData.getIssueById(req.params.id)
        if (requestBody.name && requestBody.name !== oldIssue.name) updatedObject.name = requestBody.name;
        if (requestBody.category && requestBody.category !== oldIssue.category) updatedObject.category = requestBody.category;
        if (requestBody.date && requestBody.date !== oldIssue.date) updatedObject.date = requestBody.date;
        if (requestBody.latitude && requestBody.latitude !== oldIssue.latitude) updatedObject.latitude = requestBody.latitude;
        if (requestBody.longitude && requestBody.longitude !== oldIssue.longitude) updatedObject.longitude = requestBody.longitude;
        if (requestBody.city && requestBody.city !== oldIssue.city)
            updatedObject.city = requestBody.city;
        if (requestBody.state && requestBody.state !== oldIssue.state)
            updatedObject.state = requestBody.state;
    } catch (e) {
        res.status(404).json({ error: 'Issue not found to modify the record' });
        return;
    }

    try {
        const updatedIssue = await issuesData.updateIssue(req.params.id, requestBody.name, requestBody.category, requestBody.date, requestBody.latitude, requestBody.longitude, requestBody.city, requestBody.state)
        let sessionInfo = req.session.user;
        const issueList = [updatedIssue];
        res.render('grievances/issueUpdateSuccessful', { issueList: issueList, sessionInfo: sessionInfo })
        // res.json(updatedUser);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});
// Delete User Route
router.get('/deleteAccount', async (req, res) => {
    try {
        if(req.session.user === undefined){
            res.redirect('/');
        }
        else{
            await usersData.removeUser(req.session.user);
            req.session.destroy();
            res.render('grievances/deletedAccount', {});
        }
    } catch (e) {
        res.status(500).render()
    }
});
//delete issue
router.post('/issueDelete/:id', async (req, res) => {
    try {
        if (req.session.user === undefined) {
            res.render('grievances/index');
        }
        else {
            const result = await issuesData.removeIssue(req.params.id);
            res.redirect('/ViewAllMyIssues');
        }
    } catch (e) {
        res.status(500).render()
    }
});

router.post('/createIssue', async (req, res) => {
    let issueInfo = req.body;
    if (req.session.user === undefined) {
        res.status(400).json({ error: 'You must provide user ID' });
        return;
    }
    else {
        issueInfo.userID = req.session.user;
    }
    try {
        const newIssue = await issuesData.addIssue(issueInfo.name, issueInfo.category,
            issueInfo.date, issueInfo.latitude, issueInfo.longitude,
            issueInfo.city, issueInfo.state, issueInfo.userID);
        //req.session.issue = newUser.email
        //req.session.AuthCookie = req.sessionID;
        res.render("partials/feedItem", { layout: null, ...newIssue });
    } catch (e) {
        res.sendStatus(400);
    }
});

module.exports = router;
