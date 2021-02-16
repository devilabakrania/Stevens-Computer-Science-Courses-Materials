const dbConnection = require("./mongoConnection");

const getCollectionFn = collection => {
    let _col = undefined;

    return async() => {
        if(!_col){
            const db = await dbConnection();
            _col = await db.collection(collection);
        }
        return _col;
    };
};
module.exports = {
    animals: getCollectionFn("animals")
};