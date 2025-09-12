import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Collecto API",
      version: "1.0.0",
      description:
        "API for the Collecto platform for purchasing fractional luxury goods.",
      contact: {
        name: "Giacomo Salsano",
        email: "giacomosalsano@hotmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000", // Base URL of your API
        description: "Development Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/docs/*.yaml"],
};

export const swaggerSpec = swaggerJsDoc(swaggerOptions);
