const mongoose = require('mongoose')
const AdminBro = require('admin-bro')
const AdminBroMongoose = require('@admin-bro/mongoose')
const AdminBroExpress = require('@admin-bro/express')

AdminBro.registerAdapter(AdminBroMongoose)

const User = mongoose.model("User")
const Hospital = mongoose.model("Hospital")
const Department = mongoose.model("Department")
const Language = mongoose.model("Language")

const ADMIN = {
    email: 'admin',
    password: 'password',
}

const adminBro = new AdminBro({
    resources: [{
      resource: User,
      options: {
        listProperties: [ 'name', 'email', '_id'],
        editProperties: ['name', 'email'],
        showProperties: ['_id', 'name', 'email', 'createdAt']
      }
    },
    {
      resource: Hospital,
      options: {
        listProperties: ['title', '_id'],
      }
    },
    {
      resource: Department,
    },
    {
      resource: Language,
    }
    ],
    rootPath: '/admin',
})

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
      if (ADMIN.password === password && ADMIN.email === email) {
        return ADMIN
      }
      return null
    },
    cookieName: 'adminbro',
    cookiePassword: 'somepassword',
})

module.exports = { adminBro, router }