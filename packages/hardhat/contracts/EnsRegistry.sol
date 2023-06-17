// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title EnsRegistry
 * @dev Extract of the interface for ENS Registry
 */
abstract contract EnsRegistry {
	function setOwner(bytes32 node, address owner) virtual public;
	function setSubnodeOwner(bytes32 node, bytes32 label, address owner) virtual  public;
	function setResolver(bytes32 node, address resolver) virtual  public;
	function owner(bytes32 node) virtual public view returns (address);
	function resolver(bytes32 node) virtual public view returns (address);
}
