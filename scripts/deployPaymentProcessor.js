const hre = require("hardhat");

async function main() {
    const tokenAddress = process.env.TOKEN_CONTRACT_ADDRESS;

    const PaymentProcessor = await hre.ethers.getContractFactory("PaymentProcessor");

    const paymentProcessor = await PaymentProcessor.deploy(tokenAddress);

    await paymentProcessor.waitForDeployment();

    console.log(`PaymentProcessor déployé à l'adresse : ${paymentProcessor.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
