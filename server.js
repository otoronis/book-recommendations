const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'book-recommendations'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
    
app.get('/', (req, res) => {
    db.collection('books').find().toArray()
    .then(data => {
        res.render('index.ejs', { books: data })
    })
    .catch(error => console.log(error))
    
})

app.put('/addLike', (req, res) => {
    db.collection('books').updateOne(
        {bookName: req.body.bookN, bookAuthor: req.body.authorN, likes: req.body.likesN},
        { $set: {
            likes: req.body.likesN + 1
        }},
        {
            sort: {_id: -1},
            upsert: true
        }
    )
    .then(result => {
        console.log('Like added')
        res.json('Like added')
    })
    .catch(error => console.error(error))
})

app.post('/', (req, res) => {
    db.collection('books').insertOne({bookName: req.body.book, 
    bookAuthor: req.body.author, likes: 0})
    .then(data => {
        console.log('Book added')
        res.redirect('/')
    })
})

app.delete('/deleteBook', (req, res) => {
    db.collection('books').deleteOne({bookName: req.body.bookN, bookAuthor: req.body.authorN})
    .then(result => {
        console.log('Book deleted')
        res.json('Book deleted')
    })
    .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})