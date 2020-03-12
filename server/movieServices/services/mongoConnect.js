const { MongoClient, ObjectId } = require('mongodb')
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url, { useUnifiedTopology: true })
const dbName = 'entertainme'
const Movie = require('../models/index')

module.exports = (req, res, next) => {
  client
    .connect()
    .then(() => {
      console.log('Database Connected')
      const db = client.db(dbName)
      req.database = new Movie(db.collection('movies'))
      req.db = db
      next()
    })
    .catch(err => {
      next(err)
    })
}
