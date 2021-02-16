const mongoCollections = require("../config/mongoCollections");
const albums = mongoCollections.albums;
const bands = require("./bands");


let exportedMethods = {
  getAllalbums() {
    return albums().then(albumCollection => {
      return albumCollection.find({}).toArray();
    });
  },
  getalbumById(id) {
    return albums().then(albumCollection => {
      return albumCollection.findOne({ _id: id }).then(album => {
        if (!album) throw "Album Unavailable";
        return album;
      });
    });
  },
  addAlbum(title, songs, author) {
    return albums().then(albumCollection => {
      return bands.getBandById(albumId).then(bandThatPosted => {
        let newAlbum = {
          title: title,
          songs: songs,
          author: author
            //id: id
            //name: `${bandThatPosted.bandName} ${bandThatPosted.bandMembers} ${bandThatPosted.yearFormed} ${bandThatPosted.genres} ${bandThatPosted.recordLabel} ${bandThatPosted.albums}`
          
        };

        return albumCollection
          .insertOne(newAlbum)
          .then(newInsertInformation => {
            return newInsertInformation.insertedId;
          })
          .then(newId => {
            return this.getAlbumById(newId);
          });
      });
    });
  },
  removeAlbum(id) {
    return albums().then(albumCollection => {
      return albumCollection.removeOne({ _id: id }).then(deletionInfo => {
        if (deletionInfo.deletedCount === 0) {
          throw `Unable to delete album with id of ${id}`;
        } else {
        }
      });
    });
  },
  updateAlbum(title, songs, author) {
    return albums().then(albumCollection => {
      return bands.getBandById(posterId).then(bandThatPosted => {
        let updatedAlbum = {
          title: title,
          songs: songs,
          author: author
          //{
            //id: id
           // name: `${bandThatPosted.bandName} ${bandThatPosted.bandMembers} ${bandThatPosted.yearFormed} ${bandThatPosted.genres} ${bandThatPosted.recordLabel} ${bandThatPosted.albums}`
            
          //}
        };

        return albumCollection
          .updateOne({ _id: id }, updatedAlbum)
          .then(result => {
            return this.getAlbumById(id);
          });
      });
    });
  }
};

module.exports = exportedMethods;


