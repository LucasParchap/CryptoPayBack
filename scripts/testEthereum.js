const { getBalance, transferTokens } = require("../services/ethereum");

(async () => {
    const address = "0x443F4060b86fa18413b6e202f8fe972aC1f02e29"; // Adresse de test
    const recipient = "0xCD390A9f3F1039139cB14928D29607b1E1E90DDD"; // Adresse de destination

    try {
        const balance = await getBalance(address);
        console.log(`Balance de ${address}: ${balance} CPT`);

        const result = await transferTokens(recipient, "100");
        console.log(result);

        const newBalance = await getBalance(address);
        console.log(`Nouveau solde de ${address}: ${newBalance} CPT`);
    } catch (error) {
        console.error("Erreur :", error);
    }
})();
