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

const menu = {
    Models: { name: 'Models', icon: 'Dashboard' },
    Helpers: { name: 'Helpers', icon: 'Wheat' },
}

const adminBro = new AdminBro({
    assets: {
        styles: ['/admin.css']
    },
    branding: {
        companyName: 'HospalTrip',
        logo: false,
        softwareBrothers: false
    },
    resources: [{
      resource: User,
      options: {
        parent: menu.Models,
        listProperties: [ 'name', 'email', '_id'],
        editProperties: ['name', 'email'],
        showProperties: ['_id', 'name', 'email', 'createdAt']
      }
    },
    {
      resource: Hospital,
      options: {
        parent: menu.Models,
        listProperties: ['title', '_id'],
      }
    },
    {
      resource: Department,
      options: {
        listProperties: ['title'],
        showProperties: ['title'],
        parent: menu.Helpers,
      }
    },
    {
      resource: Language,
      options: {
        listProperties: ['title'],
        showProperties: ['title'],
        parent: menu.Helpers,
      }
    }
    ],
    locale: {
        translations: {
        messages: {
            loginWelcome: "To the best admin panel in the universe"
        }
        }
    },
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