import { connect } from 'mongoose';

export default (dbURL, options = {}, callback) => {
  connect(
    dbURL,
    options
  )
    .then((db) => {
      console.log(`Successfully connected to ${dbURL}.`);
      if (callback) callback();
      return db;
    })
    .catch((err) => {
      if (err.message.code === 'ETIMEDOUT') {
        console.log('Attempting to re-establish database connection.', 'API');
        connect(dbURL);
      } else {
        console.log('Error while attempting to connect to database:', 'API');
        console.log(err);
      }
    });
};