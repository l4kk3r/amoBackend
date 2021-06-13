const mongoose = require('mongoose')
const AdminBro = require('admin-bro')
const AdminBroMongoose = require('@admin-bro/mongoose')
const AdminBroExpress = require('@admin-bro/express')

AdminBro.registerAdapter(AdminBroMongoose)

const User = mongoose.model("User")
const Hospital = mongoose.model("Hospital")
const Doctor = mongoose.model("Doctor")

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
        properties: {
          hospitalType: {
            availableValues: [{ value: 'University hospital', label: 'University hospital' }, { value: 'State hospital', label: 'State hospital' }, { value: 'Private clinic', label: 'Private clinic' }]
          },
          departments: {
            availableValues: [{ value: 'Obstetrics & Gynecology', label: 'Obstetrics & Gynecology' }, { value: 'Skin treatment', label: 'Skin treatment' }, { value: 'Obesity', label: 'Obesity' }, { value: 'Plastic surgery', label: 'Plastic surgery' }, { value: 'Dentist', label: 'Dentist' }, { value: 'Hair loss', label: 'Hair loss' }, { value: 'Urology', label: 'Urology' }, { value: 'Ophthalmology', label: 'Ophthalmology' }, { value: 'Cardiology', label: 'Cardiology' }, { value: 'Health checkup', label: 'Health checkup' }, { value: 'Cancer / Tumor', label: 'Cancer / Tumor' }, { value: 'Gastroenterology', label: 'Gastroenterology' }]
          },
          'details.languages': {
            availableValues: [{ value: 'English', label: 'English' }, { value: 'Korean', label: 'Korean' }, { value: 'Russian', label: 'Russian' }, { value: 'Mongolian', label: 'Mongolian' }, { value: 'Chinese', label: 'Chinese' }, { value: 'Hebrew', label: 'Hebrew' }, { value: 'Hebrew ', label: 'Hebrew ' }, { value: 'French', label: 'French' }, { value: 'Ivrit', label: 'Ivrit' }]
          },
        }
      }
    },
    {
      resource: Doctor,
      options: {
        parent: menu.Models,
        listProperties: ['name'],
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