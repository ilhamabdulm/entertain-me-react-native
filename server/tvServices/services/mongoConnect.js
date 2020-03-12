const { MongoClient, ObjectId } = require('mongodb')
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url, { useUnifiedTopology: true })
const dbName = 'entertainme'
const TvSeries = require('../models/index')

module.exports = (req, res, next) => {
  client
    .connect()
    .then(() => {
      console.log('Database Connected')
      const db = client.db(dbName)
      req.database = new TvSeries(db.collection('tvseries'))
      req.db = db
      next()
    })
    .catch(err => {
      next(err)
    })
}
