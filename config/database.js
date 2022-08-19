const mongoose = require('mongoose');

const connectDB = () => {
  try {
    const { DB_HOST, DB_PORT, DB_NAME } = process.env;
    mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);

    const db = mongoose.connection;

    db.on('error', (err) => console.log(err));

    db.once('open', () => {
      console.log('Database connting ...');
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDB };
