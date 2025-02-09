const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./db/db");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

async function testDatabaseConnection() {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT NOW()');
        console.log('✅ Connexion à la base de données réussie !');
        console.log('📅 Date du serveur:', result.rows[0].now);
        client.release();
    } catch (err) {
        console.error('❌ Erreur de connexion à la base de données:');
        console.error('→ Message:', err.message);
        console.error('→ URL de connexion utilisée:', process.env.DATABASE_URL || `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
    }
}

testDatabaseConnection();

// Routes de base
app.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.send(`✅ API en ligne. Base de données connectée : ${result.rows[0].now}`);
    } catch (err) {
        console.error("❌ Erreur lors de la connexion à la base de données:", err.message);
        res.status(500).send("Erreur interne du serveur.");
    }
});

app.get("/users", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users"); // Table `users` supposée
        res.json(result.rows);
    } catch (err) {
        console.error("❌ Erreur lors de la récupération des utilisateurs:", err.message);
        res.status(500).send("Erreur interne du serveur.");
    }
});

app.post("/users", async (req, res) => {
    const { name, email } = req.body;
    try {
        const result = await pool.query("INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *", [name, email]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("❌ Erreur lors de l'ajout d'un utilisateur:", err.message);
        res.status(500).send("Erreur interne du serveur.");
    }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`✅ Serveur lancé sur le port ${PORT}`));
