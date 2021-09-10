const { MongoClient } = require("mongodb");

const db = ({ uri, databaseName }) => {
    const client = new MongoClient(uri);
    return {
        database: null,
        run: () => {
            return new Promise((res, rej) => {
                client
                    .connect()
                    .then((clientData) => {
                        this.database = clientData.db(databaseName);
                        res("Success");
                    })
                    .catch((err) => {
                        rej(err);
                    });
            });
        },
        getDB: () => {
            return this.database;
        },
        closeDb: () => {
            client.close();
        },
    };
};

module.exports = {
    db,
};
