const mongoose = require('mongoose');

const mongoURI = process.env.DB_HOST
    .replace('<username>', process.env.DB_USER)
    .replace('<password>', process.env.DB_PASSWORD)

const mongoOption = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose.connection.on('error', (err) => console.log(err.message))

mongoose.connect(mongoURI, mongoOption)

module.exports = mongoose