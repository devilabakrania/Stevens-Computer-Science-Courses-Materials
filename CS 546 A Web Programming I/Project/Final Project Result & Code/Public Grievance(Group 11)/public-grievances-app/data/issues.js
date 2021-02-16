const mongoCollections = require('../config/mongoCollections');
const issues = mongoCollections.issues;
const usersCol = mongoCollections.users;
const users = require('./users');
const { ObjectId } = require('mongodb');
const uuid = require('node-uuid');

function kmToCoordinate(km) {
    // 1 km = 0.00654 in coordinates
    return km * 0.00654;
}

let exportedMethods = {
    async getAllIssues() {
        const issueCollection = await issues();
        const issueList = await issueCollection.find({}).sort({ date: -1 }).toArray();
        return issueList;
    },
    async getIssuesByUserId(userID) {
        const user = await users.getUserById(userID);
        const issues = user.issues;
        let issueList = [];
        for (let issue of issues) {
            let insertedIssue = await this.getIssueById(issue._id);
            issueList.push(insertedIssue);
        }
        if (!issueList) throw 'User has no issues!';
        return issueList;
    },
    async getIssueById(id) {
        id = ObjectId(id);
        const issueCollection = await issues();
        const issue = await issueCollection.findOne({ _id: id });
        return issue;
    },
    async addIssue(name, category, date, latitude, longitude, city, state, userID) { // user
        if (!name) throw 'Issue name missing.';
        if (!category) throw 'Category missing.';
        if (!date) throw 'Date missing.';
        if (!latitude) throw 'Latitude missing.';
        if (!longitude) throw 'Longitude missing.';
        if (!city) throw 'City missing.';
        if (!state) throw 'State missing.';
        if (!userID) throw 'User ID missing.';

        const issueCollection = await issues();
        const userCollection = await usersCol();
        const user = await userCollection.findOne({ email: userID }); //user
        let newIssue = {
            name: name,
            category: category,
            date: date,
            likes: 0,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            city: city,
            state: state,
            status: "open",
            userID: user._id,
            comments: []
        };
        const issueInfo = await issueCollection.insertOne(newIssue);
        if (issueInfo.insertedCount === 0) throw 'Could not add issue';
        const id = issueInfo.insertedId;
        await users.addIssueToUser(user._id, id);
        const issue = await this.getIssueById(id);
        return issue;
    },
    async getIssuesByCategory(category) {
        const issueCollection = await issues();
        const issueList = await issueCollection.find({ category: category })
            .sort({ date: -1 }).toArray();
        return issueList;
    },
    async getIssuesByCity(city) {
        const issueCollection = await issues();
        const issueList = await issueCollection.find({ city: city })
            .sort({ date: -1 }).toArray();
        return issueList;
    },
    async getIssuesByState(state) {
        const issueCollection = await issues();
        const issueList = await issueCollection.find({ state: state })
            .sort({ date: -1 }).toArray();
        return issueList;
    },
    async getIssuesByStatus(status) {
        const issueCollection = await issues();
        const issueList = await issueCollection.find({ status: status })
            .sort({ date: -1 }).toArray();
        return issueList;
    },
    async getNearbyIssues(lat, lng, radius) {
        const issueCollection = await issues();
        let lat_max = parseFloat(lat) + kmToCoordinate(radius);
        let lat_min = parseFloat(lat) - kmToCoordinate(radius);

        let lng_max = parseFloat(lng) + kmToCoordinate(radius);
        let lng_min = parseFloat(lng) - kmToCoordinate(radius);

        const issueList = await issueCollection.find({ latitude: { $gt: lat_min, $lt: lat_max } },
                                                        { longitude: { $gt: lng_min, $lt: lng_max } })
                                                        .sort({ date: -1 }).toArray();
        return issueList;
    },
    async updateIssue(issueId, name, category, date, latitude,longitude,city,state) {
        issueId = ObjectId(issueId)
        const issueCollection = await issues();
        const updatedIssueData = {};

        if (name) {
            updatedIssueData.name = name;
        }
        if (category) {
            updatedIssueData.category = category;
        }
        if (date) {
            updatedIssueData.date = date;
        }
        if (latitude) {
            updatedIssueData.latitude = latitude;
        }
        if (longitude) {
            updatedIssueData.longitude = longitude;
        }
        if (city) {
            updatedIssueData.city = city;
        }
        if (state) {
            updatedIssueData.state = state;
        }

        const updatedInfo = await issueCollection.updateOne({ _id: issueId }, { $set: updatedIssueData });
        if (updatedInfo.modifiedCount === 0) {
          console.log('No updates made');
        }

        return await this.getIssueById(issueId)

    },
    async removeIssue(id) {
        if (!id) throw 'Issue ID missing';
        const issueCollection = await issues();
        const issue = await this.getIssueById(id);
        const userId = issue.userID;
        id = id = ObjectId(id);
        const deletionInfo = await issueCollection.deleteOne({ _id: id });
        if (deletionInfo.deletedCount === 0) {
            throw "Could not delete issue";
        }
        const result = await users.removeIssueFromUser(userId, id);
        return true;
    },

    // Delete all the issues related to a specific user!
    async removeAllIssue(userId) {
        if (!userId) throw 'User ID missing';
        const issueCollection = await issues();
        //const issue = await this.getIssueById(id);
        const deletionInfo = await issueCollection.deleteMany({ userID: userId }); // This will remove all the issues related to a specific USER when he deletes the account in issue collection
        if (deletionInfo.deletedCount === 0) {
            console.log("deleted all the issues");
            return true;
            //throw "Could not delete issue";
        }
        return true;
    },
    async closeIssue(id) {
        if (!id) throw 'Issue ID missing';
        const issueCollection = await issues();
        id = ObjectId(id);
        const updatedInfo = await issueCollection.updateOne({ _id: id }, {$set: { status: "closed" }});
        if (updatedInfo.modifiedCount === 0) {
          throw 'could not close issue successfully';
        }
        return await this.getIssueById(id);
    },
    async openIssue(id) {
        if (!id) throw 'Issue ID missing';
        const issueCollection = await issues();
        id = ObjectId(id);
        const updatedInfo = await issueCollection.updateOne({ _id: id }, {$set: { status: "open" }});
        if (updatedInfo.modifiedCount === 0) {
          throw 'could not open issue successfully';
        }
        return await this.getIssueById(id);
    },
    async likeIssue(id) {
        if (!id) throw 'Issue ID missing';
        const issueCollection = await issues();
        id = ObjectId(id);
        const updatedInfo = await issueCollection.updateOne({ _id: id }, {$inc: { likes: 1 }});
        if (updatedInfo.modifiedCount === 0) {
          throw 'could not like issue successfully';
        }
        return await this.getIssueById(id);
    },
    async unlikeIssue(id) {
        if (!id) throw 'Issue ID missing';
        const issueCollection = await issues();
        id = ObjectId(id);
        const updatedInfo = await issueCollection.updateOne({ _id: id }, {$inc: { likes: -1 }});
        if (updatedInfo.modifiedCount === 0) {
          throw 'could not unlike issue successfully';
        }
        return await this.getIssueById(id);
    },

    async getAllComments(issueId) {
        const issue = await this.getIssueById(issueId);
        return issue.comments;
    },
    async addComment(name, content, issueId) {
        const issueCollection = await issues();

        const comment = {
            _id: uuid.v4(),
            name: name,
            content: content
        };

        issueId = ObjectId(issueId);

        const updatedInfo = await issueCollection.updateOne({ _id: issueId }, { $addToSet: { comments: comment } });
        if (updatedInfo.modifiedCount === 0) {
            throw 'Could not add comment.';
        }

        return comment;
    }
};

module.exports = exportedMethods;
