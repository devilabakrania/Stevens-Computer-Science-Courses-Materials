const mongoCollections = require("../mongoCollections");
const animals = mongoCollections.animals;
const { ObjectId } = require("mongodb");
module.exports = {
    async getAnimalsById(id){
        if(!id)throw "Please provide an id to search";
        
        const animalCollection = await animals();
        const Animal1 = await animalCollection.findOne({ _id: id});
        if(Animal1 === null) throw "No Animal with that id";
        return Animal1;
    },

    async getAll(){
        const animalCollection = await animals();
        const allanimal = await animalCollection.find({}).toArray();
        return allanimal;
    },
    
    async create(name,animalType){
        const animalCollection = await animals();
        if(!name) 
        throw "Please provide Animal Name";
        if(!animalType || Array.isArray(animalType))
        throw "Please provide animalType Array";
        if(animalType.length === 0)
        throw "Please provide at least one animalType";
        
        let newAnimal = {
            name: name,
            animalType: animalType
        };
        const insertAnimal = await animalCollection.insertOne(newAnimal);
        if(insertAnimal.insertedCount === 0)
        throw "Unable to add Animal";

        let newid = insertAnimal.insertedId;

        let animal2 = await this.getAnimalsById(newid);
        return animal2; 
    },
    async remove(id){
        if(!id) throw "Please provide an id to search";
        
        const animalCollection = await animals();
        let newid = new require('mongodb').ObjectID(id);
        const idtoberemoved = await this.getAll(id)
        const removeanimal = await animalCollection.removeOne({_id : newid});

        if(removeanimal.deletedCount === 0){
            throw "Unable to delete animal with id : ${id}";
        }
        else if(removeanimal === null) throw "Animal with that id doesnot exists"
        else return idtoberemoved;

    },

    async rename(id, newName){
        if(!id) throw "Please provide an id to search";
        if(!newName) throw "Please provide animal name";
        const animalCollection = await animals();
        const renamedanimal = {
            $set: {name: newName}
        };
        let newid = new require('mongodb').ObjectID(id);
        const renameddata = await animalCollection.updateOne({_id: newid}, renamedanimal);
        if(renameddata.modifiedCount === 0){
            throw "Unable to rename animal name";
        }
        return await animalCollection.findOne({_id: newid});
    }
};