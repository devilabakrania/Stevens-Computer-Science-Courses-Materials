const dbConnection = require('../config/mongoConnection');
const collections = require('../config/mongoCollections');
// const data = require('../data/');
// const issues = data.issues;
// const users = data.users;
const users = collections.users;
const issues = collections.issues

const main = async () => {
	const db = await dbConnection();
	await db.dropDatabase();
	const userCollection = await users();
	//admin
	const admin = {
		firstName:"admin",
		lastName:"admin",
		email:"admin@gmail.com",
		hashedPassword:"$2a$10$qNEx7flsZd8uhblad06LR.3y3tZXRD1Ok63peN6gwtRHnHPdXxfEq",
		city:"Jersey City",
		admin:true,
		issues:[],
		state:"New Jersey"
	}
	await userCollection.insertOne(admin);
	//users
	const samir = {
		firstName:"Samir",
		lastName:"Shah",
		email:"samir@gmail.com",
		hashedPassword:"$2a$10$55/wDSuHDdAE/cJufbd03eBzm7zymBBI80Z0f2gFcL5p2kPOLLquy",
		city:"hoboken",
		admin:false,
		issues:[],
		state:"New Jersey"
	}
	await userCollection.insertOne(samir);
	const rajit = {
		firstName:"Rajit ",
		lastName:"Gohel",
		email:"rajit@gmail.com",
		hashedPassword:"$2a$10$L3aCxsRzbOVxuJ1hXAOFZ.YdZSPd4YN.xCim/HBRf7712WnV7PH8e",
		city:"Jersey City",
		admin:false,
		issues:[],
		state:"New Jersey"
	}
	await userCollection.insertOne(rajit);

	const steve = {
		firstName:"steve",
		lastName:"gunarso",
		email:"steve@gmail.com",
		hashedPassword:"$2a$10$kRJw89dvzniQG1JXprUcoetHyc8JJ41cO2ZNI4h1YzsRW8R6D2Dfu",
		city:"union city",
		admin:false,
		issues:[],
		state:"New Jersey"
	}
	await userCollection.insertOne(steve);
	console.log('Done seeding database');
	await db.serverConfig.close();
};

main().catch(console.log);
