let ethPrice;
let receivedAmount = 0;

// Change this to use your own infura ID
const web3 = new Web3("wss://goerli.infura.io/ws/v3/48d55356a0d24b91855f633e8cf4b197");

// AggregatorV3Interface ABI
const aggregatorV3InterfaceABI =
[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Received",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "getLatestPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "razor",
		"outputs": [
			{
				"internalType": "contract Razor",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

// Price Feed Address
const addr = "0x801582B8712bF4390e42aE111f1329894960A3a4";

document.getElementById("address").innerText = addr;

// Set up contract instance
const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr);
//Make call to latestRoundData()
priceFeed.methods.getLatestPrice().call()
    .then((price) => {
        // Do something with roundData
        ethPrice = price / 1.e8;
        console.log("Ethereum Price: ", price / 1.e8)
    });

priceFeed.events.Received((error, event) => {
    if (event) {
        receivedAmount = event.returnValues[1];
        console.log(receivedAmount);
        console.log(amountToPay * 1e18);
        if (receivedAmount >= amountToPay * 1e18) {
            withdrawFruit('H');
            document.getElementsByClassName("modal-card-body")[0].innerHTML = `
            <center>
            <div class="columns is-vcentered has-background-primary">
                <div class="column">
                    <strong class="has-text-black">
                    Payment Succeeded
                    </strong>
                    <br>
                </div>
            </div>
            <div class="columns is-vcentered">
                <div class="column">
                    <figure class="image is-128x128">
                    <img src="assets/png/basket.png" alt="">
                    </figure>
                </div>
            </div>
            <div class="columns is-vcentered has-background-info-light">
                <div class="column">
                   <strong class="has-text-black">You can now withdraw your purchase</strong> 
                </div>
            </div>

        </center>
            `;
        } else {
            document.getElementsByClassName("modal-card-body")[0].innerHTML = `
            <center>
            <div class="columns is-vcentered has-background-danger">
                <div class="column">
                    <strong class="has-text-black">
                    Failed to proceed: Insufficient funds sent
                    </strong>
                    <br>
                </div>
            </div>
            <div class="columns is-vcentered">
                <div class="column">
                    <figure class="image is-128x128">
                    <img src="assets/png/cashier.png" alt="">
                    </figure>
                </div>
            </div>
            <div class="columns is-vcentered has-background-info-light">
                <div class="column">
                   <strong class="has-text-black">Please remake your purchase</strong> 
                </div>
            </div>
    
        </center>
            `;
        }

    }
});
