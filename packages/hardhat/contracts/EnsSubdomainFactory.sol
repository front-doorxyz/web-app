// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './EnsRegistry.sol';
import './EnsResolver.sol';

// ---------------------------------------------------------------------------------------------------
// EnsSubdomainF actory - allows creating and configuring custom ENS subdomains with one contract call.
// ---------------------------------------------------------------------------------------------------

/**
 * @title EnsSubdomainFactory
 * @dev Allows to create and configure a subdomain for Ethereum ENS in one call.
 * After deploying this contract, change the owner of the domain you want to use
 * to this deployed contract address. For example, transfer the ownership of "somedomain.eth"
 * so anyone can create subdomains like "eth-[address].somedomain.eth".
 */

 contract Ownable {

  address owner;

  modifier onlyOwner virtual {
    require(msg.sender == owner, "Ownable: You are not the owner, Bye.");
    _;
  }

  constructor () {
    owner = msg.sender;
  }
}

contract EnsSubdomainFactory is Ownable{
	EnsRegistry public registry;
	EnsResolver public resolver;
	bool public locked;
    bytes32 emptyNamehash = 0x00;
	bytes32 topDomainHash = keccak256(abi.encodePacked("eth"));
	bytes32 domainHash = keccak256(abi.encodePacked("repro"));

	event SubdomainCreated(address indexed creator, address indexed owner, bytes32 subdomain);
	event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
	event RegistryUpdated(address indexed previousRegistry, address indexed newRegistry);
	event ResolverUpdated(address indexed previousResolver, address indexed newResolver);
	event TextUpdated(bytes32 subdomain);
	event DomainTransfersLocked();

	constructor(EnsRegistry _registry, EnsResolver _resolver) {
		owner = payable(msg.sender);
		registry = _registry;
		resolver = _resolver;
		locked = false;
	}
	
	/**
	 * @dev Throws if called by any account other than the owner.
	 *
	 */
	modifier onlyOwner() override {
		require(msg.sender == owner);
		_;
	}

	/**
	 * @dev Allows to create a subdomain (e.g. "radek.startonchain.eth"),
	 * set its resolver and set its target address
	 */
	function newSubdomain() public {
		//create namehash for the topdomain
		bytes32 topdomainNamehash = keccak256(abi.encodePacked(emptyNamehash, topDomainHash));
		//create namehash for the domain
		bytes32 domainNamehash = keccak256(abi.encodePacked(topdomainNamehash, domainHash));
		//make sure this contract owns the domain
		require(registry.owner(domainNamehash) == address(this), "this contract should own the domain");
		//create labelhash for the sub domain
		bytes32 subdomainLabelhash = keccak256(abi.encodePacked(keccak256(abi.encodePacked("eth-")), msg.sender));
		//create namehash for the sub domain
		bytes32 subdomainNamehash = keccak256(abi.encodePacked(domainNamehash, subdomainLabelhash));
		//make sure it is free or owned by the sender
		require(registry.owner(subdomainNamehash) == address(0) ||
			registry.owner(subdomainNamehash) == msg.sender, "sub domain already owned");
		//create new subdomain, temporarily this smartcontract is the owner
		registry.setSubnodeOwner(domainNamehash, subdomainLabelhash, address(this));
		//set public resolver for this domain
		registry.setResolver(subdomainNamehash, address(resolver));
		//change the ownership back to requested owner
		registry.setOwner(subdomainNamehash, msg.sender);

		emit SubdomainCreated(msg.sender, msg.sender, subdomainLabelhash);
	}

	function newSubdomainByAddress(address _guest) public {
		//create namehash for the topdomain
		bytes32 topdomainNamehash = keccak256(abi.encodePacked(emptyNamehash, topDomainHash));
		//create namehash for the domain
		bytes32 domainNamehash = keccak256(abi.encodePacked(topdomainNamehash, domainHash));
		//make sure this contract owns the domain
		require(registry.owner(domainNamehash) == address(this), "this contract should own the domain");
		//create labelhash for the sub domain
		bytes32 subdomainLabelhash = keccak256(abi.encodePacked(keccak256(abi.encodePacked("eth-")), _guest));
		//create namehash for the sub domain
		bytes32 subdomainNamehash = keccak256(abi.encodePacked(domainNamehash, subdomainLabelhash));
		//make sure it is free or owned by the sender
		require(registry.owner(subdomainNamehash) == address(0) ||
			registry.owner(subdomainNamehash) == _guest, "sub domain already owned");
		//create new subdomain, temporarily this smartcontract is the owner
		registry.setSubnodeOwner(domainNamehash, subdomainLabelhash, address(this));
		//set public resolver for this domain
		registry.setResolver(subdomainNamehash, address(resolver));
		//change the ownership back to requested owner
		registry.setOwner(subdomainNamehash, _guest);
		emit SubdomainCreated(_guest, _guest, subdomainLabelhash);
	}

	function setResolver(address _resolver) public {
		//create namehash for the topdomain
		bytes32 topdomainNamehash = keccak256(abi.encodePacked(emptyNamehash, topDomainHash));
		//create namehash for the domain
		bytes32 domainNamehash = keccak256(abi.encodePacked(topdomainNamehash, domainHash));
		//make sure this contract owns the domain
		require(registry.owner(domainNamehash) == address(this), "this contract should own the domain");
		//create labelhash for the sub domain

		//bytes32 subdomainLabelhash = keccak256(abi.encodePacked(_subdomain));
		bytes32 subdomainLabelhash = keccak256(abi.encodePacked(keccak256(abi.encodePacked("eth-")), msg.sender));
		
		//create namehash for the sub domain
		bytes32 subdomainNamehash = keccak256(abi.encodePacked(domainNamehash, subdomainLabelhash));
		//make sure it is free or owned by the sender
		require(registry.owner(subdomainNamehash) == address(0) ||
			registry.owner(subdomainNamehash) == msg.sender, "sub domain already owned");
		//set public resolver for this domain
		registry.setResolver(subdomainNamehash, _resolver);
		
		emit ResolverUpdated(msg.sender, _resolver);
	}

	function setText(string memory _key, string memory _value) public {
		//create namehash for the topdomain
		bytes32 topdomainNamehash = keccak256(abi.encodePacked(emptyNamehash, topDomainHash));
		//create namehash for the domain
		bytes32 domainNamehash = keccak256(abi.encodePacked(topdomainNamehash, domainHash));
		//make sure this contract owns the domain
		require(registry.owner(domainNamehash) == address(this), "this contract should own the domain");
		
		//create labelhash for the sub domain
		//bytes32 subdomainLabelhash = keccak256(abi.encodePacked(_subdomain));
		bytes32 subdomainLabelhash = keccak256(abi.encodePacked(keccak256(abi.encodePacked("eth-")), msg.sender));
		
		//create namehash for the sub domain
		bytes32 subdomainNamehash = keccak256(abi.encodePacked(domainNamehash, subdomainLabelhash));
		//make sure it is owned by the sender
		require(registry.owner(subdomainNamehash) == msg.sender, "text can only be set by owner");
		//set text
		setText(subdomainNamehash, _key, _value);
		
		emit TextUpdated(subdomainLabelhash);
	}

	function text(string memory _key) public view returns(string memory) {
		//create namehash for the topdomain
		bytes32 topdomainNamehash = keccak256(abi.encodePacked(emptyNamehash, topDomainHash));
		//create namehash for the domain
		bytes32 domainNamehash = keccak256(abi.encodePacked(topdomainNamehash, domainHash));
		//make sure this contract owns the domain
		require(registry.owner(domainNamehash) == address(this), "this contract should own the domain");
		
		//create labelhash for the sub domain
		//bytes32 subdomainLabelhash = keccak256(abi.encodePacked(_subdomain));
		bytes32 subdomainLabelhash = keccak256(abi.encodePacked(keccak256(abi.encodePacked("eth-")), msg.sender));
		
		//create namehash for the sub domain
		bytes32 subdomainNamehash = keccak256(abi.encodePacked(domainNamehash, subdomainLabelhash));
		//make sure it is owned by the sender
		require(registry.owner(subdomainNamehash) == address(0) || 
			registry.owner(subdomainNamehash) == msg.sender, "registered subdomains text can only be read by owner");
		//set public resolver for this domain
		return text(subdomainNamehash, _key);
	}

	/**
	 * @dev Returns the owner of a domain (e.g. "startonchain.eth"),
	 */
	function domainOwner() public view returns (address) {
		bytes32 topdomainNamehash = keccak256(abi.encodePacked(emptyNamehash, topDomainHash));
		bytes32 namehash = keccak256(abi.encodePacked(topdomainNamehash, domainHash));
		return registry.owner(namehash);
	}

	/**
	 * @dev Return the owner of a subdomain (e.g. "radek.startonchain.eth"),
	 */
	function subdomainOwner() public view returns (address) {
		bytes32 topdomainNamehash = keccak256(abi.encodePacked(emptyNamehash, topDomainHash));
		bytes32 domainNamehash = keccak256(abi.encodePacked(topdomainNamehash, domainHash));
		bytes32 subdomainLabelhash = keccak256(abi.encodePacked(keccak256(abi.encodePacked("eth-")), msg.sender));
		bytes32 subdomainNamehash = keccak256(abi.encodePacked(domainNamehash, subdomainLabelhash));
		return registry.owner(subdomainNamehash);
	}

	function subdomainResolver() public view returns (address) {
		bytes32 topdomainNamehash = keccak256(abi.encodePacked(emptyNamehash, topDomainHash));
		bytes32 domainNamehash = keccak256(abi.encodePacked(topdomainNamehash, domainHash));
		bytes32 subdomainLabelhash = keccak256(abi.encodePacked(keccak256(abi.encodePacked("eth-")), msg.sender));
		bytes32 subdomainNamehash = keccak256(abi.encodePacked(domainNamehash, subdomainLabelhash));
		return registry.resolver(subdomainNamehash);
	}

    /**
    * @dev Return the target address where the subdomain is pointing to (e.g. "0x12345..."),
    */
    function subdomainTarget() public view returns (address) {
        bytes32 topdomainNamehash = keccak256(abi.encodePacked(emptyNamehash, topDomainHash));
        bytes32 domainNamehash = keccak256(abi.encodePacked(topdomainNamehash, domainHash));
		bytes32 subdomainLabelhash = keccak256(abi.encodePacked(keccak256(abi.encodePacked("eth-")), msg.sender));
		bytes32 subdomainNamehash = keccak256(abi.encodePacked(domainNamehash, subdomainLabelhash));
        address currentResolver = registry.resolver(subdomainNamehash);
        return EnsResolver(currentResolver).addr(subdomainNamehash);
    }


	mapping(bytes32=>mapping(string=>string)) texts;

    event TextChanged(bytes32 indexed node, string indexed indexedKey, string key);

	function setText(bytes32 node, string memory key, string memory value) public {
        texts[node][key] = value;
        emit TextChanged(node, key, key);
    }

    function text(bytes32 node, string memory key) public view returns (string memory) {
        return texts[node][key];
    }

	/**
	 * @dev The contract owner can take away the ownership of any domain owned by this contract.
	 * @param _node - namehash of the domain
	 * @param _owner - new owner for the domain
	 */
	function transferDomainOwnership(bytes32 _node, address _owner) public onlyOwner {
		require(!locked);
		registry.setOwner(_node, _owner);
	}

	/**
	 * @dev The contract owner can lock and prevent any future domain ownership transfers.
	 */
	function lockDomainOwnershipTransfers() public onlyOwner {
		require(!locked);
		locked = true;
		emit DomainTransfersLocked();
	}

	/**
	 * @dev Allows to update to new ENS registry.
	 * @param _registry The address of new ENS registry to use.
	 */
	function updateRegistry(EnsRegistry _registry) public onlyOwner {
		require(registry != _registry, "new registry should be different from old");
		emit RegistryUpdated(address(registry), address(_registry));
		registry = _registry;
	}

	/**
	 * @dev Allows to update to new ENS resolver.
	 * @param _resolver The address of new ENS resolver to use.
	 */
	function updateResolver(EnsResolver _resolver) public onlyOwner {
		require(resolver != _resolver, "new resolver should be different from old");
		emit ResolverUpdated(address(resolver), address(_resolver));
		resolver = _resolver;
	}

	/**
	 * @dev Allows the current owner to transfer control of the contract to a new owner.
	 * @param _owner The address to transfer ownership to.
	 */
	function transferContractOwnership(address payable _owner) public onlyOwner {
		require(_owner != address(0), "cannot transfer to address(0)");
		emit OwnershipTransferred(owner, _owner);
		owner = _owner;
	}
}