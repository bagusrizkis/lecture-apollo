const { ObjectId } = require("mongodb");
const { db } = require("../db.js");

// INITIALISASI DATABASE BEGIN
const mongodb = db({
    uri: "mongodb://127.0.0.1:27017",
    databaseName: "product",
});
// INITIALISASI DATABASE END

// MODEL GLOBAL BEGIN
const Model = ({ collection }) => {
    return {
        findAll: () => {
            return mongodb.getDB().collection(collection).find().toArray();
        },
        create: (data) => {
            return mongodb.getDB().collection(collection).insertOne(data);
        },
        destroy: ({ id }) => {
            return mongodb
                .getDB()
                .collection(collection)
                .deleteOne({ _id: ObjectId(id) });
        },
    };
};
// MODEL GLOBAL END

const Product = Model({ collection: "products" });

module.exports = { mongodb, Product };
