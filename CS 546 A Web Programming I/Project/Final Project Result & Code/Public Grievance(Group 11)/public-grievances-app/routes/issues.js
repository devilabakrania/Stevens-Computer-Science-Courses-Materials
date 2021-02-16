const express = require('express');
const router = express.Router();
const data = require('../data');
const issuesData = data.issues;
const usersData = data.users;
const { ObjectId } = require('mongodb');
const file = require('../public/file.js')
const xss = require('xss');

router.get('/createIssue', async (req, res) => {
	try {
		if (req.session.user === undefined) {
			res.render('grievances/login', { message: "You must login first!" });
		} else {
			res.render('grievances/createIssue');
		}
	} catch (error) {
		res.status(401).json({ error: "Page Not Found" });
	}
});

router.get('/:id', async (req, res) => {
	try {
		if (req.session.user === undefined) {
			res.render('grievances/login', { message: "You must login first!" });
		}
		else {
			let issue = await issuesData.getIssueById(req.params.id);
			const issueList = [issue];
			if (issueList === null || issueList === undefined)
				res.status(404).json({ error: 'No issue found' })
			else
				//res.render('grievances/ViewAllMyIssues', { issueByUserId: issueByUserId, sessionInfo: sessionInfo })
				res.render('grievances/viewIssue', { issueList: issueList });
		}

	} catch (e) {
		res.status(404).json({ error: 'issue not found' });
	}
});

// router.get('/user/:id', async (req, res) => {
// 	try {
// 		if (req.session.user === undefined) {
// 	        res.render('grievances/index');
// 	        return;
// 	    }
// 		let issueList = await issuesData.getIssuesByUserId(req.params.id);
// 		if (issueList === null || issueList === undefined)
// 			res.status(404).json({ error: 'No issue found' })
// 		else
// 			res.render('grievances/issue', { issueList: issueList });
// 	} catch (e) {
// 		res.status(404).json({ error: 'issue not found' });
// 	}
// });

router.get('/', async (req, res) => {
	try {
		if (req.session.user === undefined) {
			res.render('grievances/login', { message: "You must login first!" });
		}
		let issueList = await issuesData.getAllIssues();
		res.render('grievances/issue', { issueList: issueList });
	} catch (e) {
		res.sendStatus(400);
	}
});

router.post('/comment/:id', async (req, res) => {
	try {
		if (req.session.user === undefined) {
			res.render('grievances/login', { message: "You must login first!" });
		}
		else {
			const cc = xss(req.body.content);
			if (!cc) {
				console.log("No content typed");
			} else {
				await issuesData.addComment(req.session.user, cc, req.params.id);
			}
			let issueid = req.params.id
			const user = await usersData.getUserByEmail(req.session.user)
			if(req.body.hidcmt){
				let sessionInfo = req.session.user;
				const newIssue = await issuesData.getIssueById(issueid)
				const issueList = [newIssue];
				res.render('grievances/viewIssue', { issueList: issueList, sessionInfo: sessionInfo });
			}
			else{
				res.redirect('back');
			}
		}
	} catch (e) {
		res.sendStatus(400);
	}
});

router.post('/close/:id', async (req, res) => {
	try {
		if (req.session.user === undefined) {
			res.render('grievances/login', { message: "You must login as Admin first!" });
		}
		else {
			const user = await usersData.getUserByEmail(req.session.user)
			if (user.admin === true) {
				await issuesData.closeIssue(req.params.id);
				//res.redirect("/issues");
				res.redirect('back');
			}
			else {
				res.render('grievances/login', { message: "You must login as Admin first!" });
			}
		}
	} catch (e) {
		res.sendStatus(400);
	}
});

router.post('/open/:id', async (req, res) => {
	try {
		if (req.session.user === undefined) {
			res.render('grievances/login', { message: "You must login as Admin first!" });
		}
		else {
			const user = await usersData.getUserByEmail(req.session.user)
			if (user.admin === true) {
				await issuesData.openIssue(req.params.id);
				//res.redirect("/issues");
				res.redirect('back');
			}
			else {
				res.render('grievances/login', { message: "You must login as Admin first!" });
			}
		}
	} catch (e) {
		res.sendStatus(400);
	}
});

router.post('/like/:id', async (req, res) => {
	try {
		if (req.session.user === undefined) {
			res.render('grievances/login', { message: "You must login first!" });
		}
		else{
			await issuesData.likeIssue(req.params.id);
			const user = await usersData.getUserByEmail(req.session.user)
			let issueid = req.params.id
			res.redirect('back');
		}
	} catch (e) {
		res.sendStatus(400);
	}
});

// router.post('/unlike/:id', async (req, res) => {
// 	try {
// 		if (req.session.user === undefined) {
// 			res.render('grievances/login', { message: "You must login first!" });
// 		}
// 		await issuesData.unlikeIssue(req.params.id);
// 		res.redirect('back');
// 	} catch (e) {
// 		res.sendStatus(400);
// 	}
// });

router.post('/createIssue', async (req, res) => {
	const issueInfo = req.body;
	const iname = xss(issueInfo.name); // only one field can be edited by user


	if (req.session.user === undefined) {
		res.render('grievances/login', { message: "You must login first!" });
	}
	else {
		issueInfo.userID = req.session.user;
	}
	if (!issueInfo) {
		res.status(400).json({ error: 'You must provide data to create a user' });
		return;
	}
	if (!iname) {
		res.status(400).json({ error: 'You must provide an issue name' });
		return;
	}
	if (!issueInfo.category) {
		res.status(400).json({ error: 'You must provide a category name' });
		return;
	}
	if (!issueInfo.date) {
		res.status(400).json({ error: 'You must provide date' });
		return;
	}
	if (!issueInfo.latitude) {
		res.status(400).json({ error: 'Latitude information is not present' });
		return;
	}
	if (!issueInfo.longitude) {
		res.status(400).json({ error: 'Longitude information is not present' });
		return;
	}
	if (!issueInfo.city) {
		res.status(400).json({ error: 'You must provide city' });
		return;
	}
	if (!issueInfo.state) {
		res.status(400).json({ error: 'You must provide state' });
		return;
	}

	try {
		const newIssue = await issuesData.addIssue(iname, issueInfo.category,
			issueInfo.date, issueInfo.latitude, issueInfo.longitude,
			issueInfo.city, issueInfo.state, issueInfo.userID);

		//req.session.issue = newUser.email
		//req.session.AuthCookie = req.sessionID;
		let sessionInfo = req.session.user;
		const issueList = [newIssue];
		res.render('grievances/viewIssue', { issueList: issueList, sessionInfo: sessionInfo });
	} catch (e) {
		res.sendStatus(400);
	}
});

router.post('/download', async (req, res) => {
	if (req.session.user === undefined) {
		res.render('grievances/login', { message: "You must login first!" });
	}
	try {
		file.downloadFile();
		res.redirect("/adminHome");
	} catch (e) {
		res.sendStatus(400);
	}
});


module.exports = router;
