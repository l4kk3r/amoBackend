const express = require('express')
const cors = require('cors')
require('module-alias/register')

const PORT = process.env.PORT

/* APP */
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

/* DATABASE */
const db = require('@database/database');
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

/* ROUTES */
const authRoutes = require('@src/auth/auth.routes')
app.use('/user', require('./src/user/user.routes'))
app.use('/auth', authRoutes)

/* SERVER */
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})