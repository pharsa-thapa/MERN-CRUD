var router = require('express').Router()
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

var usersRouter = require('./users');
var apiBase = require('./apiBase');
var bookRouter = require('./books');
var personRouter = require('./persons');
var organisationRouter = require('./organisations');

router.use( '/books', bookRouter);
router.use('/users', usersRouter);
router.use('/persons', personRouter);
router.use('/organisations', organisationRouter);
router.use('/' , apiBase);

// Swagger set up
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Time to document that Express API you built",
      version: "1.0.0",
      description:
        "A test project to understand how easy it is to document and Express API",
      license: {
//        name: "MIT",
//        url: "https://choosealicense.com/licenses/mit/"
      },
      contact: {
//        name: "Swagger",
//        url: "https://swagger.io",
//        email: "Info@SmartBear.com"
      }
    },
    servers: [
      {
        url: "http://localhost:8000/api/v1/"
      }
    ]
  },
  apis: ["./models/personModel.js","./routes/persons.js"]
}

const specs = swaggerJsdoc(options);
router.use("/docs", swaggerUi.serve);
router.get("/docs", swaggerUi.setup(specs, { explorer: true }));


module.exports = router;
