const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const rateLimiter = async (req, res, next) => {
  let clientId = req.cookies?.clientId;

  if (!clientId) {
    clientId = uuidv4();
    res.cookie("clientId", clientId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días
    });
  }

  const oneMinuteAgo = new Date(Date.now() - 60000).toISOString();

  try {
    const result = await pool.query(
      `SELECT COUNT(*) 
       FROM purchases 
       WHERE client_id = $1 
       AND purchase_time > $2`,
      [clientId, oneMinuteAgo]
    );

    const purchaseCount = parseInt(result.rows[0].count);

    if (purchaseCount >= 1) {
      return res.status(429).json({
        success: false,
        message: "Too many requests. Please wait a minute between purchases.",
      });
    }

    req.clientId = clientId;
    next();
  } catch (error) {
    console.error("Rate limiter error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = rateLimiter;
