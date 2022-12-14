var abi = [
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "duckId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "dna",
				"type": "uint256"
			}
		],
		"name": "NewDuck",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "duckId",
				"type": "uint256"
			}
		],
		"name": "buyMarketDuck",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "buyRandomDuck",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "createRandomDuck",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "ducks",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "dna",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "duckOwner",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
var DuckFactoryContract = web3.eth.contract(abi)
var contractAddress = "0xfA3fB0897AB1EE7934dddE88571644a0DC3101c3"/* our contract address on Ethereum after deploying */
var DuckFactory = DuckFactoryContract.at(contractAddress)
// `DuckFactory` has access to our contract's public functions and events

// some sort of event listener to take the text input:
// $("#botao-sortear").click(function(e) {
//   console.log("Sorteando patinho...")
//   var name = "patinho"
//   // Call our contract's `createRandomDuck` function:
//   DuckFactory.createRandomDuck(name)
// })

function botaoSortear() {
  console.log("Sorteando patinho...")
  var name = "patinho"
  // Call our contract's `createRandomDuck` function:
  DuckFactory.createRandomDuck(name)
}

// Listen for the `NewDuck` event, and update the UI
var event = DuckFactory.NewDuck(function(error, result) {
  if (error) return
  generateDuck(result.duckId, result.name, result.dna)
})

// take the Duck dna, and update our image
function generateDuck(id, name, dna) {
  let dnaStr = String(dna)
  
  console.log("Duck ID: " + id)
  console.log("Duck Name: " + name)
  console.log("Duck DNA: " + dnaStr)
  // pad DNA with leading zeroes if it's less than 14 characters
  while (dnaStr.length < 14)
    dnaStr = "0" + dnaStr

  let duckDetails = {
	//bill head wing body foot tail color
    
    billChoice: dnaStr.substring(0, 2) % 2 + 1,
	
    headChoice: dnaStr.substring(2, 4) % 2 + 1,

    wingChoice: dnaStr.substring(4, 6) % 2 + 1,
	
	bodyChoice: dnaStr.substring(6, 8) % 2 + 1,
	
	footChoice: dnaStr.substring(8, 10) % 2 + 1,
	
	tailChoice: dnaStr.substring(10, 12) % 2 + 1,
	
	// colorChoice: dnaStr.substring(12, 14) % 2 + 1,
	
    // last 6 digits control color. Updated using CSS filter: hue-rotate
    // which has 360 degrees:
    //skinColorChoice: parseInt(dnaStr.substring(6, 8) / 100 * 360),
    //eyeColorChoice: parseInt(dnaStr.substring(8, 10) / 100 * 360),
    //clothesColorChoice: parseInt(dnaStr.substring(10, 12) / 100 * 360),
    duckName: name,
    //duckDescription: "A CryptoDuck",
  }
  return duckDetails
}


//What our javascript then does is take the values generated 
//in zombieDetails above, and use some browser-based javascript 
//magic (we're using Vue.js) to swap out the images and apply CSS 
//filters. 