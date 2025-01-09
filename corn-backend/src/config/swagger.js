const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//? Configuración para Swagger
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Corn Sales API",
    version: "1.0.0",
    description: "API for managing corn purchases",
  },
  servers: [
    {
      url: "http://localhost:3002",
      description: "Local server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
