pragma solidity >=0.5.0 <0.6.0;

import "hardhat/console.sol";

contract DuckFactory {

    address owner;

    constructor() public
    {
        owner =  msg.sender;
        console.log("Contract Deployed");
    }

    modifier onlyOwner 
    {
		require(msg.sender == owner, "Somente o dono do contrato pode invocar essa funcao!");
		_;
	}

    event NewDuck(uint duckId, string name, uint dna);

    uint dnaDigits = 14; //bill head wing body foot tail color
    uint dnaModulus = 10 ** dnaDigits;

    struct Duck 
    {
        string name;
        uint dna;
        address duckOwner;
    }

    Duck[] public ducks;

    function _createDuck(string memory _name, uint _dna) private
    {
        address duckOwner =  msg.sender;
        uint id = ducks.push(Duck(_name, _dna, duckOwner)) - 1;
        emit NewDuck(id, _name, _dna);
    }

    function _generateRandomDna(string memory _str) private view returns (uint) 
    {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    function createRandomDuck(string memory _name) public onlyOwner
    {
        uint randDna = _generateRandomDna(_name);
        _createDuck(_name, randDna);
    }

    function buyRandomDuck(string memory _name) public payable
    {
        require(
            msg.value >= 0.02 ether
            // 20000000 Gwei
        );
        uint randDna = _generateRandomDna(_name);
        _createDuck(_name, randDna);
    }

    function buyMarketDuck(uint duckId) public payable
    {
        require(
            msg.value >= 0.02 ether
            // 20000000 Gwei
            && ducks[duckId].duckOwner == owner 
            //precisa ser do dono do contrato
        );

        ducks[duckId].duckOwner = msg.sender;

    }





}
