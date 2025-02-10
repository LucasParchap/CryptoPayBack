const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authRoutes = require("./auth");
const convertRoutes = require("./cryptoConversion");
const paymentRoutes = require("./payment");
require("dotenv").config();


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Accès refusé : Token manquant" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token invalide ou expiré" });
        }

        req.user = user;
        next();
    });
};

router.use("/auth", authRoutes);
router.use("/crypto", convertRoutes);
router.use("/payments", paymentRoutes);

router.get("/", authenticateToken, (req, res) => {
    res.json({ message: `Bienvenue sur l'API, utilisateur ID: ${req.user.userId}` });
});

module.exports = router;
