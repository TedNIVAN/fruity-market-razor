pragma solidity ^0.6.7;

interface Razor {
    function getResult(uint256 id) external view returns (uint256);
    function getJob(uint256 id) external view returns(string memory url, string memory selector, string memory name, bool repeat, uint256 result);
}

contract FruityMarket {
    Razor public razor;

    constructor() public {
        razor = Razor(0x310DF80268CfB188B50291F2b7a1A26b97614F4D);
    }

    /**
     * Sends event on receive
     */
    event Received(address, uint);
    
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
    
    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (uint256) {
        return razor.getResult(1);
    }
}
