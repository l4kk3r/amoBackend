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

/* ADMIN PANEL */
const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroSequelize = require('@admin-bro/sequelize')

AdminBro.registerAdapter(AdminBroSequelize)
const adminBro = new AdminBro({
  resources: [{
    resource: require('@src/user/user.entity'),
  },
  {
    resource: require('@src/hospital/hospital.entity'),
  },
  {
    resource: require('@src/hospital/hospital.entity').Department,
  },
  {
    resource: require('@src/hospital/hospital.entity').Hopital_Department,
  },

],
  rootPath: '/admin',
})

const router = AdminBroExpress.buildRouter(adminBro)
app.use(adminBro.options.rootPath, router)

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