const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    // Adresse du contrat déployé (remplacez par l'adresse de votre contrat déployé)
    const contractAddress = "0x79169dDE8d0401DD52deb5396c4E5D56fAFbb383";

    // Charger le contrat déployé
    const CryptoPayToken = await hre.ethers.getContractAt("CryptoPayToken", contractAddress);

    // Vérifier le solde du wallet déployeur
    const balance = await CryptoPayToken.balanceOf(deployer.address);

    console.log(`Le solde de l'adresse ${deployer.address} est : ${hre.ethers.formatEther(balance)} CPT`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
