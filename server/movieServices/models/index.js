const { ObjectId } = require('mongodb')

class MovieModel {
  constructor(db) {
    this.collection = db
  }

  findAll(params) {
    let condition
    if (params === undefined) {
      condition = {}
    } else {
      condition = params
    }
    return this.collection.find(params).toArray()
  }

  findOne(params) {
    let condition
    if (params._id) {
      condition = { _id: ObjectId(params._id) }
    } else {
      condition = params
    }
    return this.collection.find(condition).toArray()
  }

  findById(id) {
    return this.collection.find({ _id: ObjectId(id) }).toArray()
  }

  create(data) {
    return this.collection.insertOne(data)
  }

  deleteById(id) {
    return this.collection.findOneAndDelete({ _id: ObjectId(id) })
  }

  updateById(id, data) {
    return this.collection.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: data }
    )
  }
}

module.exports = MovieModel
