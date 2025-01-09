const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const setupSwagger = require("./config/swagger");

const cookieParser = require("cookie-parser");

const app = express();
const cornRoutes = require("./routes/cornRoutes");

app.use(cookieParser());

app.use(helmet());

//? Configuración de Swagger
setupSwagger(app);

//? Configuración de CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", //? URL del frontend
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

//? Middleware para parsear JSON
app.use(express.json());

//? Rutas
app.use("/api/corn", cornRoutes);

//? Manejador de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Server error",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    `API documentation available at http://localhost:${PORT}/api-docs`
  );
});
