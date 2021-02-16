const mongoCollections = require('./mongoCollections');
const posts = mongoCollections.posts;
const bands = require('./bands');

let exportedMethods = {

    async getPostById(id) {
		if (!id) throw 'You must provide an id to search for';

		const postCollection = await posts();
		const post = await postCollection.findOne({ _id: id });
		if (post === null) throw 'No post with that id';

		return post;
	},
	async getAllPosts() {
		const postCollection = await posts();

		const postList = await postCollection.find({}).toArray();

		return postList;
    },
    
    async addBand(bandName, bandMembers, yearFormed, genres, recordLabel) {
		if (!bandName) throw 'You must provide a bandName';
		if (!bandMembers) throw 'You must provide a bandMembers';
        if (!yearFormed) throw 'You must specify a yearFormed';
        if (!genres) throw 'You must specify a genres'; 
        if (!recordLabel) throw 'You must specify a recordLabel';
        

		const postCollection = await posts();
		const BandThatPosted = await dogs.getBandById(posterId);

		const newPostInfo = {
			bandName: bandName,
            bandMembers: bandMembers,
            yearFormed: yearFormed,
            genres: genres,
            recordLabel: recordLabel

			poster: {
				id: posterId,
				name: BandThatPosted.name
			}
		};

		const insertInfo = await postCollection.insertOne(newPostInfo);
		if (insertInfo.insertedCount === 0) throw 'Could not add post';

		const newPost = await this.getPostById(insertInfo.insertedId);

		return newPost;
    },
    
    async removePost(id) {
		const postCollection = await posts();
		const deletionInfo = await postCollection.deleteOne({ _id: id });

		if (deletionInfo.deletedCount === 0) {
			throw `Could not delete post with id of ${id}`;
		}
		return { deleted: true };
	},
	async updatePost(id, title, body, posterId) {
		if (!bandName) throw 'You must provide a bandName';
		if (!bandMembers) throw 'You must provide a bandMembers';
        if (!yearFormed) throw 'You must specify a yearFormed';
        if (!genres) throw 'You must specify a genres'; 
        if (!recordLabel) throw 'You must specify a recordLabel';

		const postCollection = await posts();
		const dogThatPosted = await dogs.getBandById(posterId);

		let updatedPost = {
			title: title,
			body: body,
			poster: {
				id: posterId,
				name: dogThatPosted.name
			}
		};



    async function main() {
        const getAllBands = await bands.getAllBands();
        console.log(getAllBands);
    

    //async function main() {
        const band = await bands.getBand("9714a17c-f228-49e9-a772-9086f5ff8bfb");
        console.log(band);
    

    //async function main() {
        const band = await bands.getBand("9714a17c-f228-49e9-a772-9086f5ff8bfb");
        const updatedBand = await bands.updateBand('BandName1','Patrick Hill','2020','genre1','RecordLabelTest'); 
        console.log(updatedBand);
    

    const removeBand = await bands.removeBand("9714a17c-f228-49e9-a772-9086f5ff8bfb");

    try {
        return await bands.getBand("9714a17c-f228-49e9-a772-9086f5ff8bfb");
    } catch (error) {
      console.error(error);
   }

};
module.exports = exportedMethods;