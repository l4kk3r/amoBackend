const express = require('express')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
require('module-alias/register')

const PORT = process.env.PORT

/* APP */
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

/* DATABASE */
require('@src/mongodb_connection')

/* ADMIN PANEL */


/* SWAGGER */
const swaggerSpecs = require('./swagger_connection')
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))

/* ROUTES */
const authRoutes = require('@src/auth/auth.routes')
const userRoutes = require('@src/user/user.routes')
const hospitalRoutes = require('@src/hospital/hospital.routes')
app.use('/user', userRoutes)
app.use('/auth', authRoutes)
app.use('/hospital', hospitalRoutes)

/* SERVER */
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})
