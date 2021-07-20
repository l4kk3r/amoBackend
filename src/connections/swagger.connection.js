const swaggerJsDoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "AmoDoc API",
            version: "1.0.0",
            description: "Service for finding doctors across the world !",
            contact: {
                name: "Tim Vaulin"
            }
        },
        servers: [
            {
                url: "https://amoback.herokuapp.com"
            },
            {
                url: "http://localhost:8080"
            }
        ],
    },
    apis: ['./src/documentation/*.documentation.js']
}

const specs = swaggerJsDoc(options)

module.exports = specs
