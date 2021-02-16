

//module.exports = {
    //async addBand(bandName, bandMembers, yearFormed, genres, recordLabel);


const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const uuid = require('uuid');

let exportedMethods = {
  async this.getAllBands() {
    const bandCollection = await bands();
    const bandList = await bandCollection.find({}).toArray();
    return bandList;
  },
  // This is a fun new syntax that was brought forth in ES6, where we can define
  // methods on an object with this shorthand!
  async getBandById(id) {
    const bandCollection = await bands();
    const band = await bandCollection.findOne({_id: id});
    if (!band) throw 'User not found';
    return user;
  },
  async addBand(bandName, bandMembers, yearFormed, genres, recordLabel) {
    const bandCollection = await bands();

    let newBand = {
        bandName: bandName,
        bandMembers: bandMembers,
        yearFormed: yearFormed,
        genres: genres,
        recordLabel: recordLabel,
      _id: uuid.v4()
    };

    const newInsertInformation = await bandCollection.insertOne(newBand);
    if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
    return await this.getUserById(newInsertInformation.insertedId);
  },
  async removeBand(id) {
    const bandCollection = await band();
    const deletionInfo = await bandCollection.removeOne({_id: id});
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete band with id of ${id}`;
    }
    return true;
  },
  async updateBand(id, bandName, bandMembers, yearFormed, genres, recordLabel) {
    const band = await this.getBandById(id);
    console.log(band);

    const bandUpdateInfo = {
        bandName: bandName,
        bandMembers: bandMembers,
        yearFormed: yearFormed,
        genres: genres,
        recordLabel: recordLabel,
    };

    const bandCollection = await bands();
    const updateInfo = await bandCollection.updateOne({_id: id}, {$set: bandUpdateInfo});
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';

    return await this.getBandById(id);
  }
};

module.exports = exportedMethods;