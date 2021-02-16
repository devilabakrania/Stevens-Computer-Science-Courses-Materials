const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const issues = mongoCollections.issues;
const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');

// const { ObjectId } = require("mongodb").ObjectID;

// TODO
let exportedMethods = {
  async getAllUsers() {
    const userCollection = await users();
    const userList = await userCollection.find({}).toArray();
    if (!userList) throw 'No user in system!';
    return userList
  },
  async getUserById(id) {
    id = ObjectId(id)
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: id });
    return user
  },

  // used in Editing the user profile
  async getUserByEmail(email) {

    const userCollection = await users();
    const user = await userCollection.findOne({ email: email });
    return user;
  },

  async addUser(firstName, lastName, email, hashedPassword, city, state) {
    const userCollection = await users();

    email = email.toLowerCase(); // stored in lower case to check if user exists already
    let checkemail = await userCollection.find({ email: email }).toArray(); // to check if email already taken
    if (checkemail.length != 0) {
      return 1;
      // throw "The User with this email already exits! Try different email."
    }
    hashedPassword = await bcrypt.hash(hashedPassword, 10); // hashpassword is passed by the user while sign up. salt rounds =10.

    let newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      hashedPassword: hashedPassword,
      city: city,
      admin: false,
      issues: [],
      state: state
    };

    const newInsertInformation = await userCollection.insertOne(newUser);
    if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
    return await this.getUserById(newInsertInformation.insertedId);
  },
  async updateUser(user, firstName, lastName, emailu, city,
    state) {

    const userCollection = await users();
    const updatedUserData = {};

    if (firstName) {
      updatedUserData.firstName = firstName;
    }
    if (lastName) {
      updatedUserData.lastName = lastName;
    }
    if (emailu) {
      updatedUserData.email = emailu;
    }
    if (city) {
      updatedUserData.city = city;
    }
    if (state) {
      updatedUserData.state = state;
    }

    const updatedInfo = await userCollection.updateOne({ email: user }, { $set: updatedUserData });
    // if (updatedInfo.modifiedCount === 0) {
    //   throw 'could not update the user successfully';
    // }

    return await this.getUserByEmail(user);

  },
  async addIssueToUser(userId, issueId) {
    let currentUser = await this.getUserById(userId);
    const userCollection = await users();
    const updateInfo = await userCollection.updateOne(
      { _id: userId },
      { $addToSet: { issues: { _id: issueId } } }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw 'Update failed';
    return await this.getUserById(userId);
  },
  async removeIssueFromUser(userId, issueId) {
    let currentUser = await this.getUserById(userId);
    const userCollection = await users();
    const updateInfo = await userCollection.updateOne(
      { _id: userId },
      { $pull: { issues: { _id: issueId } } }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw 'Update failed';
    return await this.getUserById(userId);
  },

  // Delete User

  async removeUser(user) {
    const userCollection = await users();
    const issueCollection = await issues();
    let userdel = null;

    try {
      userdel = await this.getUserByEmail(user);
    } catch (e) {
      console.log(e);
      return;
    }
    try {
      const deletionInfo = await issueCollection.deleteMany({ userID: userdel._id }); // This will remove all the issues related to a specific USER when he deletes the account in issue collection
      if (deletionInfo.deletedCount === 0) {
        console.log("No issues deleted");
      }
    } catch (e) {
      console.log(e);
    }

    const deletionInfo = await userCollection.deleteOne({ email: user });
    if (deletionInfo.deletedCount === 0) {
      throw "Could not delete the User";
    }

    return true;

  },


  // User Login

  async logInUser(email, password) {
    const userCollection = await users();
    email = email.toLowerCase();
    const database_record = await userCollection.findOne({ email: email });

    if (database_record) {
      let password_verification = await bcrypt.compare(password, database_record.hashedPassword);
      if (password_verification) { // password == database_record.hashedPassword
        return database_record._id;
      } else {
        return -1;
      }

    }
    else {
      return -1;
    }

  },


  // Admin Login
  async logInAdmin(email, password) {
    const userCollection = await users();
    const database_record = await userCollection.findOne({ email: email });
    if (database_record != null && database_record.admin) { //
      let password_verification = await bcrypt.compare(password, database_record.hashedPassword);
      if (password_verification) {
        return database_record._id;
      } else {
        return -1;
      }
    } else {
      return -1;
    }
  }
};
module.exports = exportedMethods;
