const hre = require("hardhat");

async function main() {
    const initialSupply = hre.ethers.parseEther("1000000");

    // Obtenir la factory du contrat
    const CryptoPayToken = await hre.ethers.getContractFactory("CryptoPayToken");
    // Déployer le contrat
    const cryptoPayToken = await CryptoPayToken.deploy(initialSupply);

    // Attendre que le contrat soit miné
    await cryptoPayToken.waitForDeployment();

    // Afficher l'adresse de déploiement
    console.log(`CryptoPayToken déployé à l'adresse : ${cryptoPayToken.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
