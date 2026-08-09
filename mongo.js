require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.TEST_MONGODB_URI

if (!url) {
  console.log('TEST_MONGODB_URI is missing in .env')
  process.exit(1)
}

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const initialNotes = [
  {
    content: 'HTML is easy',
    important: true,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: false,
  },
]

Note.insertMany(initialNotes)
  .then(() => {
    console.log('added 2 initial notes to the test database!')
    mongoose.connection.close()
  })
  .catch((error) => {
    console.error('Error seeding test database:', error)
    mongoose.connection.close()
  })