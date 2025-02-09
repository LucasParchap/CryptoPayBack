const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();


app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the API!" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
