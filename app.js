const express = require("express");
const cors = require("cors");
require("dotenv").config();
const routes = require("./routes");
const pool = require("./db/db");

const app = express();

app.use(cors());
app.use(express.json());

async function testDatabaseConnection() {
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT NOW()");
        console.log("✅ Connexion à la base de données réussie !");
        client.release();
    } catch (err) {
        console.error("❌ Erreur de connexion à la base de données:", err.message);
    }
}
testDatabaseConnection();

// Routes API
app.use("/", routes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`✅ Serveur lancé sur le port ${PORT}`));
