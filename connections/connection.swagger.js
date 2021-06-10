const swaggerJsDoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "HospalTrip API",
            version: "1.0.0",
            description: "HospalTrip.",
            contact: {
                name: "Tim Vaulin"
            }
        },
        servers: [
            {
                url: "https://hospaltrip-server.herokuapp.com"
            },
            {
                url: "http://localhost:8080"
            }
        ],
    },
    apis: ['./src/*/*.swagger.js']
}

const specs = swaggerJsDoc(options)

module.exports = specs
