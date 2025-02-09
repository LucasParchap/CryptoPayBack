const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db/db");
require("dotenv").config();

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: "Utilisateur créé avec succès", user: result.rows[0] });
    } catch (err) {
        console.error("❌ Erreur lors de l'inscription:", err.message);

        if (err.code === "23505") {
            if (err.detail.includes("username")) {
                res.status(400).json({ message: "Le nom d'utilisateur est déjà pris." });
            } else if (err.detail.includes("email")) {
                res.status(400).json({ message: "L'adresse email est déjà utilisée." });
            } else {
                res.status(400).json({ message: "Nom d'utilisateur ou email déjà utilisé." });
            }
        } else {
            res.status(500).send("Erreur interne du serveur.");
        }
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        const user = result.rows[0];

        if (!user) {
            return res.status(404).json({ message: "Nom d'utilisateur non trouvé" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Connexion réussie", token });
    } catch (err) {
        console.error("❌ Erreur lors de la connexion:", err.message);
        res.status(500).send("Erreur interne du serveur.");
    }
});

module.exports = router;
