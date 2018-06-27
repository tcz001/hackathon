pragma solidity ^0.4.17;

contract Crypedit {
    function () public payable {
        revert();
    }

    /* Public variables of the token */

    mapping (address => string) names;
    mapping (string => address) addresses;
    mapping (address => mapping (address => string)) endorserComments;
    mapping (address => address[]) endorserAddresses;

    event Registeration(address indexed _sender, string _name);
    event Endorsement(address indexed _target, address indexed _endorser, string _comment);

    /*
    NOTE:
    The following variables are OPTIONAL vanities. One does not have to include them.
    They allow one to customise the token contract & in no way influences the core functionality.
    Some wallets/interfaces might not even bother to look at this information.
    */

    string public version = 'H0.1';       //human 0.1 standard. Just an arbitrary versioning scheme.

    function PutName(string _name) public {
        require(addresses[_name] == 0);         // name is not taken
        addresses[names[msg.sender]] = 0;       // release my current name
        addresses[_name] = msg.sender;          // take new name slot
        names[msg.sender] = _name;              // put my address on name
        emit Registeration(msg.sender, _name);
    }

    function Endorse(address _target, string _comment) public {
        endorserComments[_target][msg.sender] = _comment;
        endorserAddresses[_target][endorserAddresses[_target].length] = msg.sender;
        emit Endorsement(_target, msg.sender, _comment);
    }

    function NameOf(address _addr) public view returns (string name) {
        return names[_addr];                    // name of address
    }

    function AddressOf(string _name) public view returns (address addr) {
        return addresses[_name];                // address of name
    }

    function EndorsersOf(address _addr) public view returns (address[] addrs) {
        return endorserAddresses[_addr];
    }

    function EndorserCommentsOf(address _addr, address _endorser) public view returns (string comment) {
        return endorserComments[_addr][_endorser];
    }
}
