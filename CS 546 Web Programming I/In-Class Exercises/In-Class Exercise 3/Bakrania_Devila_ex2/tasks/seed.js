
const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.bands;
//const bands = require('./bands');
//const posts = require('./posts');
//const connection = require('./mongoConnection');

const main = async() =>{

	const db = await dbConnection();
	await db.dropDatabase();
    //const addban
    const firstBand = await band.addBand('BandName1','Patrick Hill','2020','genre1','RecordLabelTest') 
   
    //bandName, bandMembers, yearFormed, genres, recordLabel

	const max = await dogs.addBand('Max', [ 'Mastiff' ]);
	console.log(max);
	console.log('Max enters the playing field; he is a grizzled ex-cop with a heart of gold.');
	const maxPost = await posts.addBand(
		'BandName1','Patrick Hill','2020','genre1','RecordLabelTest'
	);

	const porkChop = await Bands.addBand('Pork Chop', [ 'BandName1','Patrick Hill','2020','genre1','RecordLabelTest' ]);
	//const porkChopPost = await posts.addPost('BandName1','Patrick Hill','2020','genre1','RecordLabelTest');
	//const post = await posts.addPost('BandName2','Patrick Hill','2020','genre1','RecordLabelTest');

	//console.log(post);
	//console.log("Let's change the title...");

	//const updatedPost = await posts.updatePost(post._id, "For Love of Bleu d'Auvergne", post.body, post.poster.id);

	//console.log('Now, the post is:');
	//console.log(updatedPost);

    //await posts.removeBand(updatedPost._id);

	console.log("Let's update a band");

	const updatedSashasName = await dogs.updateBand('BandName2','Patrick Hill','2020','genre2','RecordLabelTest');
	console.log("Now Band's name is:");
	console.log(updatedBandName);
    const removeSasha = await dogs.removeBand(updatedBandName._id);
    
    const db = await connection();
	await db.serverConfig.close();

	console.log('Done seeding database!');
	await db.serverConfig.close();

};
main().catch((error) => {
    console.log(error);
});









//const dbConnection = require('../config/mongoConnection');
//const data = require('../data/');
//const users = data.users;
//const posts = data.posts;

//const main = async () => {
	//const db = await dbConnection();
	//await db.dropDatabase();
	/*const patrick = await users.addUser('Patrick', 'Hill');
	const id = patrick._id;
	const firstPost = await posts.addPost('Hello, class!', 'Today we are creating a blog!', id);
	const second = await posts.addPost(
		'Using the seed',
		'We use the seed to have some initial data so we can just focus on servers this week',
		id
	);
	const third = await posts.addPost('Using routes', 'The purpose of today is to simply look at some GET routes', id);
	console.log('Done seeding database');
	await users.updateUser(patrick._id, 'John', 'Doe');
	await db.serverConfig.close();
};

main().catch(console.log);*/