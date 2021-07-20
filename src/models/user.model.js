const mongoose = require('../db/connect')
const DBField = require('../db/field')
const Schema = mongoose.Schema
const dbField = new DBField(Schema)

const TagRegularity = new Schema({
  tagID: Schema.Types.ObjectId,
  name: String,
  number: {
    type: Number,
    default: 1,
    min: 0
  },
  ...dbField.mainField
})
TagRegularity.set('toJSON', {
  transform: (_doc, result) => {
    const tagRegularityID = result._id
    delete result._id
    return {
      ...result,
      tagRegularityID
    }
  }
})
const Cart = new Schema({
  itemID: Schema.Types.ObjectId,
  productID: Schema.Types.ObjectId,
  volume: {
    type: Number,
    default: 1
  },
  selected: Boolean,
  ...dbField.mainField
})
const Notification = new Schema({
  type: Number,
  title: String,
  text: String,
  name: String,
  isRead: {
    type: Boolean,
    default: false
  },
  mediaURL: String,
  link: Object,
  ...dbField.mainField
})
Notification.pre('save', function (next) {
  this.created = mongoose.Types.ObjectId(this._id).getTimestamp()
  next()
})
Notification.set('toJSON', {
  transform: (_doc, result) => {
    const notificationID = result._id
    delete result._id
    return {
      ...result,
      notificationID
    }
  }
})
const Address = new Schema({
  province: Object,
  amphur: Object,
  district: Object,
  zipcode: String,
  phoneNumber: String,
  addressInformation: String,
  name: String,
  ...dbField.mainField
})
Address.set('toJSON', {
  transform: (_doc, result) => {
    const addressID = result._id
    delete result._id
    return {
      ...result,
      addressID
    }
  }
})
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: String,
  facebook: {
    id: String,
    token: String,
    name: String,
    tokenTimeOut: Date,
    tokenUntil: Date
  },
  salt: String,
  firstName: String,
  lastName: String,
  accountName: String,
  phoneNumber: {
    type: String,
    trim: true,
    unique: true,
    sparse: true
  },
  taste: Object,
  descriptions: {
    type: Object,
    default: {}
  },
  setting: {
    type: Object,
    default: {}
  },
  status: String,
  tagRegularity: [TagRegularity],
  searchRecord: [String],
  address: {
    type: [Address],
    default: []
  },
  notifications: {
    type: [Notification],
    default: []
  },
  defaultAddressIndex: Number,
  explanation: String,
  name: {
    type: String,
    trim: true,
    unique: true,
    sparse: true
  },
  registered: {
    type: Boolean,
    default: false
  },
  carts: {
    type: [Cart],
    default: []
  },
  admin: Boolean,
  ...dbField.mainField
})

UserSchema.set('toJSON', {
  transform: (_doc, result) => {
    const userID = result._id
    delete result._id
    delete result.__v
    delete result.password
    delete result.salt
    delete result.admin
    return {
      ...result,
      userID
    }
  }
})

UserSchema.pre('find', function(next) {
  this._id = this?.userID
  delete this?.userID
  next()
})

module.exports = mongoose.model('User', UserSchema)
