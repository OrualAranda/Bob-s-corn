/**
 * @swagger
 * tags:
 *   name: Corn
 */

const express = require("express");
const router = express.Router();
const cornController = require("../controllers/cornController");
const rateLimiter = require("../middlewares/rateLimiter");

/**
 * @swagger
 * /api/corn/purchase:
 *   post:
 *     summary: Realiza una compra de maíz.
 *     tags: [Corn]
 *     responses:
 *       200:
 *         description: Compra realizada con éxito.
 *       429:
 *         description: Demasiadas solicitudes.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/purchase", rateLimiter, cornController.purchaseCorn);

/**
 * @swagger
 * /api/corn/history:
 *   get:
 *     summary: Obtiene el historial de compras de un cliente.
 *     tags: [Corn]
 *     responses:
 *       200:
 *         description: Historial de compras obtenido exitosamente.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/history", cornController.getPurchaseHistory);

module.exports = router;
