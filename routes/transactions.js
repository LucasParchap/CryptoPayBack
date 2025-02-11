const express = require('express');
const fetch = require('node-fetch');
const pool = require("../db/db");
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

router.post('/transac', async (req, res) => {
    const { hash, from, to, value, items, date } = req.body;

    try {
        await pool.query(`
            INSERT INTO transactions (hash, "from_address", "to_address", value, items, date)
            VALUES ($1, $2, $3, $4, $5, $6)
        `, [hash, from, to, value, items, date]);

        res.status(201).json({ message: 'Transaction saved successfully' });
    } catch (error) {
        console.error('Error saving transaction:', error.message);
        res.status(500).json({ error: 'Failed to save transaction' });
    }
});
router.get('/filtered', async (req, res) => {
    try {
        const result = await pool.query(` -- Assure-toi que "db.query" est correctement configuré
            SELECT *
            FROM transactions
            ORDER BY date DESC
        `);
        res.status(200).json(result.rows); // Retourne toutes les transactions triées par date
    } catch (error) {
        console.error('Error fetching transactions:', error.message);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});
module.exports = router;
