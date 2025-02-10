const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

const apiKey = "B1MY6SAR5HS9D5HQUVA5T1RHMQDXTRVHSS";
const contractAddress = "0x79169dDE8d0401DD52deb5396c4E5D56fAFbb383";

router.get('/', async (req, res) => {
    const url = `https://api-sepolia.etherscan.io/api?module=account&action=tokentx&contractaddress=${contractAddress}&page=1&offset=10&sort=desc&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "1") {
            res.json(data.result);
        } else {
            res.status(500).json({ error: "Erreur lors de la récupération des transactions", details: data });
        }
    } catch (error) {
        res.status(500).json({ error: "Erreur de requête", details: error.message });
    }
});

module.exports = router;
