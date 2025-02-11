const { ethers, formatEther, parseEther } = require("ethers");
require("dotenv").config();

const tokenAbi = require("../artifacts/contracts/MyToken.sol/CryptoPayToken.json").abi;
const paymentProcessorAbi = require("../artifacts/contracts/PaymentProcessor.sol/PaymentProcessor.json").abi;

const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_API_URL}`);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const tokenContract = new ethers.Contract(process.env.TOKEN_CONTRACT_ADDRESS, tokenAbi, wallet);
const paymentProcessorContract = new ethers.Contract(process.env.PAYMENT_CONTRACT_ADDRESS, paymentProcessorAbi, wallet);

async function getBalance(address) {
    const balance = await tokenContract.balanceOf(address);
    return formatEther(balance);
}

async function transferTokens(to, amount) {
    const tx = await tokenContract.transfer(to, parseEther(amount));
    await tx.wait();
    return `Transferred ${amount} tokens to ${to}`;
}

async function makePayment(to, amount) {
    const tx = await paymentProcessorContract.makePayment(to, parseEther(amount));
    await tx.wait();
    return `Payment of ${amount} tokens to ${to} was successful`;
}

module.exports = { getBalance, transferTokens, makePayment };
