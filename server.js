const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const crypto = require('crypto')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'phone_survey'
})

connection.connect()

app.use(cors())
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res) => {
    res.sendFile('index.html')
})


app.get('/submit', (req, res) => {
    res.sendFile(__dirname + '/public/submit.html')
})

app.post('/submit', async (req, res) => {
    const fname = await req.body.fname
    const lname = await req.body.lname
    const dept = await req.body.dept

    const c1 = await req.body.c1
    const c2 = await req.body.c2
    const c3 = await req.body.c3

    const id = crypto.randomBytes(8).toString('hex')
    console.log(id)
    

    const query = "INSERT INTO `survey_responses` (id, fname, lname, department, question_1, question_2, question_3) VALUES (?,?,?,?,?,?,?)"
    connection.query(query, [id, fname, lname, dept, c1, c2, c3])
    res.sendFile(__dirname + '/public/submit.html')
    
})



app.listen(3050, '127.0.0.1')