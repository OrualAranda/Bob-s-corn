const pool = require("../config/database");

const cornController = {
  /**
   * Procesa una nueva compra de un maíz
   * @param {Object} req - Objeto de solicitud Express
   * @param {Object} res - Objeto de respuesta Express
   */
  purchaseCorn: async (req, res) => {
    try {
      const result = await pool.query(
        `INSERT INTO purchases (client_id, success, purchase_time) 
         VALUES ($1, $2, NOW()) 
         RETURNING id, client_id, purchase_time, success`,
        [req.clientId, true]
      );

      const purchase = result.rows[0];
      res.status(200).json({
        success: true,
        message: "Corn purchase successful !!!",
        purchase: {
          id: purchase.id,
          clientId: purchase.client_id,
          purchaseTime: new Date(purchase.purchase_time).toLocaleString(),
          success: purchase.success,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error:
          "An error occurred while processing your corn purchase. Please try again later",
      });
    }
  },

  /**
   * Obtiene el historial de compras de un cliente
   * @param {Object} req - Objeto de solicitud Express
   * @param {Object} res - Objeto de respuesta Express
   */
  getPurchaseHistory: async (req, res) => {
    try {
      const clientId = req.cookies?.clientId;

      if (!clientId) {
        return res.status(400).json({
          success: false,
          message:
            "Client ID is missing. Please make a purchase to initialize your session.",
        });
      }

      const result = await pool.query(
        `SELECT 
            id,
            client_id,
            purchase_time,
            success
         FROM purchases 
         WHERE client_id = $1
         ORDER BY purchase_time DESC 
         LIMIT 50`,
        [clientId]
      );

      const formattedPurchases = result.rows.map((purchase) => ({
        id: purchase.id,
        clientId: purchase.client_id,
        purchaseTime: new Date(purchase.purchase_time).toLocaleString(),
        success: purchase.success,
      }));

      res.status(200).json({
        success: true,
        totalPurchases: result.rowCount,
        purchases: formattedPurchases,
        message: `Showing the latest ${result.rowCount} shopping`,
      });
    } catch (error) {
      console.error("Error getting history:", error);
      res.status(500).json({
        success: false,
        error: "Error getting purchase history",
      });
    }
  },
};

module.exports = cornController;
