//Connects browser to MetaMask

import React, { useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import Chat from "./Chat";
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import Web3 from "web3";
// import "src/abis/ChatApp.json"



export function App() {

// usetstate for storing and retrieving wallet details
const [data, setdata] = useState({
	address: "",
	Balance: null,
});

// Button handler button for handling a
// request event for metamask
const btnhandler = () => {

	// Asking if metamask is already present or not
	if (window.ethereum) {

	// res[0] for fetching a first wallet
	window.ethereum
		.request({ method: "eth_requestAccounts" })
		.then((res) => accountChangeHandler(res[0]));
		
	} else {
	alert("Install Metamask Extension to use Privv!");
	}

	
	// web3Loader();
};

// getbalance function for getting a balance in
// a right format with help of ethers
const getbalance = (address) => {

	// Requesting balance method
	window.ethereum
	.request({
		method: "eth_getBalance",
		params: [address, "latest"]
	})
	.then((balance) => {
		// Setting balance
		setdata({
		address: address,
		Balance: ethers.utils.formatEther(balance) + " PrivvCoins",
		});
	});
};

// Function for getting handling all events
const accountChangeHandler = (account) => {
	// Setting an address data
	setdata({
	address: account,
	});

	// Setting a balance
	getbalance(account);
};

// const web3Loader = async (web3) => {
// 	if(window.ethereum) {
// 		window.web3 = new web3(Web3.providers.WebSocketProvider("ws://localhost:7545"))
// 		await window.ethereum.enable()
// 	}

// 	else if (window.web3) {
// 		window.web3 = new Web3(window.web3.currentProvider)
// 	}

// 	else {
// 		window.alert("Non-Ethereum browser detected! You should consider trying MetaMask.")
// 	}
// }

// const loadBlockchainData = async (web3) => {
// 	web3 = window.web3

// 	const accounts = await web3.eth.getAccounts()
// 	this.setState({
// 		accounts: accounts,
// 		account: accounts[0],
// 		otherAccount: accounts[1]
// 	})

// 	console.log(accounts)

// 	const ethBalance = await web3.eth.getBalance(this.state.account)
// 	this.setState({ ethBalance })

// 	//Load Smart Contract
// 	const networkId = await web3.eth.net.getId()
// 	const chatAppData = ChatApp.networks[networkId]
// 	const abi = ChatApp.abi

// 	if (chatAppData) {
// 		const chatContract = new web3.eth.Contract(abi, chatAppData.address)
// 		this.setState({ chatContract: chatContract })
// 	}

// 	else {
// 		window.alert('Chat Contract not deployed to detected network!')
// 	}
// }

return (
	<div className="App">
	{/* Calling all values which we
	have stored in usestate */}

	<Card className="text-center">
		
		<Card.Header>
		<strong>Address: </strong>
		{data.address}
		</Card.Header>
		<Card.Body>
		<Card.Text>
			<strong>Balance: </strong>
			{data.Balance}
		</Card.Text>
		<Button onClick={btnhandler} variant="primary">
			Connect to Wallet
		</Button>
		<Chat></Chat>
		</Card.Body>
	</Card>
	</div>
);
}

export default App;
