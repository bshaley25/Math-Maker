const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const knex = require('knex') 

const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(bodyParser.json())
app.listen(PORT, console.log(`out here on port ${PORT}`))


app.get('/', (req, res) => {
    res.json('butts')
})  