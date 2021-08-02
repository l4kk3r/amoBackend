const express = require('express')
const redis = require("redis");
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
require('module-alias/register')

const PORT = process.env.PORT

const app = express()
app.set('trust proxy', 1)

/* REDIS CONNECTION */
const RedisStore = require('connect-redis')(session)
const redisClient = redis.createClient({
    host: 'ec2-99-80-6-236.eu-west-1.compute.amazonaws.com',
    port: 31499,
    password: 'p41d70d5e97399b62ce8c6298c0866819ad91d362d104d722cff8913356c758bf'
}
);
redisClient.on('connect', function() {
    console.log('connected to redis!!');
});

app.use(cors({
    origin: ['http://localhost:3000', 'https://work-fawn.vercel.app/auth/login', 'http://work-fawn.vercel.app/auth/login'],
    credentials: true
}))
app.use(cookieParser())

/* SESSION STORE */
const SESSION_SETTINGS = {
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    rolling: false,
    withCredentials: true,
    saveUninitialized: false,
    cookie: { secure: true, httpOnly: false, sameSite: 'none' }
}
app.use(session(SESSION_SETTINGS))

/* DATABASE */
require('@connections/mongodb.connection')

/* ADMIN PANEL */
const { adminBro, router } = require('@connections/adminbro.connection')
app.use(adminBro.options.rootPath, router)

/* SWAGGER */
const swaggerSpecs = require('@connections/swagger.connection')
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))

/* APP */
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: true}))

/* ROUTES */
const authRoutes = require('@routes/auth.routes')
const doctorRoutes = require('@routes/doctor.routes')
app.use('/auth', authRoutes)
app.use('/doctor', doctorRoutes)

/* SERVER */
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})
