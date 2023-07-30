const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const serverless = require("serverless-http")
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { authentication } = require("./src/routes/Authentication");
const { ongoingTodoRouter } = require("./src/routes/OngoingTodos");
const { completedTodoRouter } = require("./src/routes/CompletedTodos");
const { pendingTodoRouter } = require("./src/routes/PendingTodos");
const { upcomingTodoRouter } = require("./src/routes/UpcomingTodos");

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

// swagger config

const specs = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Taskminder Naija Portal REST APIs",
      version: "0.1.0",
      description: "Restful APIs for Taskminder Naija application",
    },
    servers: [
      {
        url: process.env.BASE_URL,
      },
    ],
    components: {
      securitySchemes: {
        JWT: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
        },
      },
    },
    security: [
      {
        JWT: [],
      },
    ], 
  },
  apis: ["./src/routes/*.js"],
});

app.use(
  "/swagger-ui",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// endpoints
app.use("/api/v1/authentication/", authentication);
app.use("/api/v1/todos/", ongoingTodoRouter);
app.use("/api/v1/todos/", completedTodoRouter);
app.use("/api/v1/todos/", pendingTodoRouter);
app.use("/api/v1/todos/", upcomingTodoRouter);

app.get("/", (_req, res) => {
  res.send("Welcome to Taskminder restful APIs");
});

const connection_string = process.env.CONNECTION_STRING;
const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose
  .connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection to database establised...");
  })
  .catch((error) => {
    console.log("Connection to database failed: " + error.message);
  });

  module.exports.handler = serverless(app)