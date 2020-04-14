require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const knex = require('knex') 
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('./knexfile')[process.env.NODE_ENV || 'development']
const database = knex(config)

const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(bodyParser.json())
app.listen(PORT, console.log(`out here on port ${PORT}`))


app.post('/users', (req, res) => {
    const { username, password } = req.body
    bcrypt.hash(password, 12).then(hashedPassword => {
        database('user')
        .insert({
            username,
            password_hash: hashedPassword
        }).returning('*')
        .then(users => {
            res.status(201).json( users )
        })
    })
})

app.post('/login', async (req,res) => {
    const { username, password } = req.body
    const found_user = await database('user')
    .select()
    .where('username', username)
    .first()

    if(!found_user) {
        res.sendStatus(401)
    }

    const isPasswordMatch = await bcrypt.compare(password, found_user.password_hash)

    if(!isPasswordMatch) {
        res.sendStatus(401)
    }

    const token = jwt.sign({
        id: found_user.id,
        username: found_user.username
    }, process.env.SECRET)

    res.json({token})
})

app.post('/savegrid', authenticate, (req,res) => {

    
    let { gridData, rows, columns } = req.body 
    
    gridData = JSON.stringify(gridData)

    database('gridData')
    .insert({
        user_id: req.user.id,
        colums: columns,
        rows: rows,
        data: gridData
    }).returning('*')
    .then( grids => {
        res.status(201).json(grids)
    })
})

app.get('/grids', authenticate, (req,res) => {
    database('gridData')
    .select()
    .where('user_id', req.user.id)
    .then(grid => res.json(grid))
})

async function authenticate (req,res,next) {

    const token = req.headers.authorization.split(' ')[1]

    if(!token) {
        res.sendStatus(401)
    }

    let id
    try{
        id = jwt.verify(token, process.env.SECRET).id
    } catch(error) {
        res.sendStatus(403).json("butts")
    }

    const user = await database('user')
    .select()
    .where('id', id)
    .first()

    req.user = user

    next()

}
