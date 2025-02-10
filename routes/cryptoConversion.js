const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

// Route for converting EUR to ETH
router.post("/convert-fiat", async (req, res) => {
    try {
        const { montant } = req.body; // Montant en euros

        if (!montant || isNaN(montant) || montant <= 0) {
            return res.status(400).json({ error: "Montant invalide. Veuillez fournir un montant numérique positif." });
        }

        const response = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
            params: {
                ids: "ethereum",
                vs_currencies: "eur"
            }
        });

        const rate = response?.data?.ethereum?.eur;

        if (!rate || rate <= 0) {
            return res.status(500).json({ error: "Impossible de récupérer un taux de conversion valide." });
        }

        // Conversion
        const montantConverti = (montant / rate).toFixed(8); // On garde 8 décimales

        res.json({ montant_eth: montantConverti });
    } catch (error) {
        console.error("Erreur lors de la conversion :", error.message);
        res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." });
    }
});

module.exports = router;
