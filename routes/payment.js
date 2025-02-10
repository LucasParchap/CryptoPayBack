const express = require("express");
const router = express.Router();
const { ethers } = require("ethers");
const { paymentContract, makePayment } = require("../services/ethereum");

router.post("/pay", async (req, res) => {
    const { to, amount, from } = req.body;

    console.log("Received payment request:", { to, amount, from }); // Log de la requête

    try {
        const result = await makePayment(to, amount);
        console.log("Payment success:", result); // Log de la réussite
        res.status(200).json({ message: "Paiement effectué", details: result });
    } catch (error) {
        console.error("Payment error:", error); // Log de l'erreur
        res.status(500).json({ message: "Erreur de paiement", error: error.message });
    }
});

/*
router.post("/withdraw", async (req, res) => {
    const { amount } = req.body;

    try {
        const tx = await paymentContract.withdraw(ethers.utils.parseUnits(amount, 18), {
            gasLimit: 100000,
        });
        await tx.wait();
        res.status(200).json({ message: "Retrait effectué", tx });
    } catch (error) {
        res.status(500).json({ message: "Erreur de retrait", error: error.message });
    }
});
router.get("/balance/:address", async (req, res) => {
    try {
        const balance = await getBalance(req.params.address);
        res.json({ balance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/transfer", async (req, res) => {
    const { to, amount } = req.body;
    try {
        const result = await transferTokens(to, amount);
        res.json({ message: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});*/
module.exports = router;
