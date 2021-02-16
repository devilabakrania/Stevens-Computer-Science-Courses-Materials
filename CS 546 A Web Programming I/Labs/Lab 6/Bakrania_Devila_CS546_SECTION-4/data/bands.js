const mongoCollections = require("../config/mongoCollections");
const bands = mongoCollections.bands;

let exportedMethods = {
  getAllBands() {
    return bands().then(bandCollection => {
      return bandCollection.find({}).toArray();
    });
  },
  

  getBandById(id) {
    return bands().then(bandCollection => {
      return bandCollection.findOne({ _id: id }).then(band => {
        if (!band) throw "Band unavailable";
        return band;
      });
    });
  },
  addBand(bandName,bandMembers,yearFormed,genres,recordLabel,albums) {
    return bands().then(bandCollection => {
      let newBand = {
        bandName: bandName,
        bandMembers: bandMembers,
        yearFormed: yearFormed,
        genres: genres,
        recordLabel: recordLabel,
        albums: albums
        };

      return bandCollection
        .insertOne(newBand)
        .then(newInsertInformation => {
          return newInsertInformation.insertedId;
        })
        .then(newId => {
          return this.getBandById(newId);
        });
    });
  },
  removeBand(id) {
    return bands().then(bandCollection => {
      return bandCollection.removeOne({ _id: id }).then(deletionInfo => {
        if (deletionInfo.deletedCount === 0) {
          throw `Unable to delete band with id of ${id}`;
        }
      });
    });
  },
  updateBand(bandName,bandMembers,yearFormed,genres,recordLabel,albums) {
    return this.getBandById(id).then(currentBand => {
      let updatedBand = {
        bandName: bandName,
        bandMembers: bandMembers,
        yearFormed: yearFormed,
        genres: genres,
        recordLabel: recordLabel,
        albums: albums
      };

      return bandCollection.updateOne({ _id: id }, updatedBand).then(() => {
        return this.getBandById(id);
      });
    });
  }
};

module.exports = exportedMethods;