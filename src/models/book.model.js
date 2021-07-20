const mongoose = require('../db/connect')
const DBField = require('../db/field')
const Schema = mongoose.Schema
const dbField = new DBField(Schema)

const Group = new Schema({
  name: String,
  ...dbField.mainField
})
Group.set('toJSON', {
  transform: (_doc, result) => {
    const groupID = result._id
    delete result._id
    return {
      ...result,
      groupID
    }
  }
})

const Type = new Schema({
  name: String,
  ...dbField.mainField
})
Type.set('toJSON', {
  transform: (_doc, result) => {
    const typeID = result._id
    delete result._id
    return {
      ...result,
      typeID
    }
  }
})

const Publisher = new Schema({
  name: String,
  ...dbField.mainField
})
Publisher.set('toJSON', {
  transform: (_doc, result) => {
    const publisherID = result._id
    delete result._id
    return {
      ...result,
      publisherID
    }
  }
})

const Author = new Schema({
  firstName: String,
  lastName: String,
  ...dbField.mainField
})
Author.set('toJSON', {
  transform: (_doc, result) => {
    const authorID = result._id
    delete result._id
    return {
      ...result,
      authorID
    }
  }
})

const BookSchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    sparse: true
  },
  code: String,
  barcode: String,
  groupList: {
    type: [Group],
    default: []
  },
  type: Type,
  publisher: Publisher,
  author: Author,
  ...dbField.mainField
})

BookSchema.set('toJSON', {
  transform: (_doc, result) => {
    const bookID = result._id
    delete result._id
    return {
      ...result,
      bookID
    }
  }
})

BookSchema.pre('find', function(next) {
  this._id = this?.bookID
  delete this?.bookID
  next()
})

module.exports = mongoose.model('Book', BookSchema)
