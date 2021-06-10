const express = require('express')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
require('module-alias/register')

const PORT = process.env.PORT

const app = express()

/* DATABASE */
const connection = require('@connections/connection.mongodb')

/* ADMIN PANEL */
const { adminBro, router } = require('@connections/connection.adminbro')
app.use(adminBro.options.rootPath, router)

/* SWAGGER */
const swaggerSpecs = require('@connections/connection.swagger')
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))

/* APP */
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static('public'))

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
