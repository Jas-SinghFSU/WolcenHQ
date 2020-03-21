const mongoClient = require("mongodb").MongoClient;
const { mongoURI } = require("../Config/default.json");
let db;

const connect = async () => {
  try {
    const dbConnection = await mongoClient.connect(mongoURI, {
      useUnifiedTopology: true
    });
    db = dbConnection.db("WolcenHQ-Development");

    return {
      res: "success",
      data: "Successfully connected to database."
    };
  } catch (error) {
    return {
      res: "fail",
      data: err
    };
  }
};

const getDatabase = () => {
  return db;
};

const close = () => {
  db.close();
};

module.exports = {
  connect,
  getDatabase,
  close
};
