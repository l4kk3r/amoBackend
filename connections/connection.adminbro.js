const mongoose = require('mongoose')
const AdminBro = require('admin-bro')
const AdminBroMongoose = require('@admin-bro/mongoose')
const AdminBroExpress = require('@admin-bro/express')
const uploadFeature = require('@admin-bro/upload')

AdminBro.registerAdapter(AdminBroMongoose)

const User = mongoose.model("User")
const Hospital = mongoose.model("Hospital")
const Doctor = mongoose.model("Doctor")
const Country = mongoose.model("Country")
const HospitalType = mongoose.model("HospitalType")
const Department = mongoose.model("Department")

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
        styles: ['/static/admin/admin.css']
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
      features: [uploadFeature({
        provider: { local: { bucket: 'public' } },
        properties: {
          filePath: `uploadedFile`,
          key: `imagePath`,
        }
      })],
      options: {
        parent: menu.Models,
        listProperties: ['title', '_id'],
        properties: {
          description: {
            type: 'richtext'
          },
          country: {
            availableValues: [{ value: 'South Korea', label: 'South Korea' }, { value: 'Germany', label: 'Germany' }, { value: 'Israel', label: 'Israel' }]
          },
          hospitalType: {
            availableValues: [{ value: 'University hospital', label: 'University hospital' }, { value: 'State hospital', label: 'State hospital' }, { value: 'Private clinic', label: 'Private clinic' }]
          },
          departments: {
            availableValues: [{ value: 'Obstetrics & Gynecology', label: 'Obstetrics & Gynecology' }, { value: 'Skin treatment', label: 'Skin treatment' }, { value: 'Obesity', label: 'Obesity' }, { value: 'Plastic surgery', label: 'Plastic surgery' }, { value: 'Dentist', label: 'Dentist' }, { value: 'Hair loss', label: 'Hair loss' }, { value: 'Urology', label: 'Urology' }, { value: 'Ophthalmology', label: 'Ophthalmology' }, { value: 'Cardiology', label: 'Cardiology' }, { value: 'Health checkup', label: 'Health checkup' }, { value: 'Cancer / Tumor', label: 'Cancer / Tumor' }, { value: 'Gastroenterology', label: 'Gastroenterology' }]
          },
          'details.languages': {
            availableValues: [{ value: 'English', label: 'English' }, { value: 'Korean', label: 'Korean' }, { value: 'Russian', label: 'Russian' }, { value: 'Mongolian', label: 'Mongolian' }, { value: 'Chinese', label: 'Chinese' }, { value: 'Hebrew', label: 'Hebrew' }, { value: 'Hebrew ', label: 'Hebrew ' }, { value: 'French', label: 'French' }, { value: 'Ivrit', label: 'Ivrit' }]
          },
          url: {
            isDisabled: true
          }
        }
      }
    },
    {
      resource: Doctor,
      options: {
        parent: menu.Models,
        listProperties: ['name'],
      }
    },
    {
      resource: Country,
      options: {
        parent: menu.Helpers,
        listProperties: ['name'],
        editProperties: ['name']
      }
    },
    {
      resource: HospitalType,
      options: {
        parent: menu.Helpers,
        listProperties: ['name'],
        editProperties: ['name']
      }
    },
    {
      resource: Department,
      options: {
        parent: menu.Helpers,
        listProperties: ['name'],
        editProperties: ['name']
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