const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const PORT = 8000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

let db,
    dbConnectionStr = 'mongodb+srv://otoronis:weonline@cluster0.vqidi7t.mongodb.net/?retryWrites=true&w=majority',
    dbName = 'book-recommendations'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} database`)
        db = client.db(dbName)
    })

app.get('/', (req, res) => {
    db.collection('books').find().toArray()
    .then(data => {
        res.render('index.ejs', { books: data })
    })
    .catch(error => console.log(error))
    
})

app.put('/', (req, res) => {
    
})

app.post('/', (req, res) => {
    db.collection('books').insertOne({bookName: req.body.book, 
    bookAuthor: req.body.author, likes: 0})
    .then(data => {
        console.log('Book added')
        res.redirect('/')
    })
})

app.delete('/', (req, res) => {
    
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})