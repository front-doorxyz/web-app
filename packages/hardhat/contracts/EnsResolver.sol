// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title EnsResolver
 * @dev Extract of the interface for ENS Resolver
 */
abstract contract EnsResolver {
	function setAddr(bytes32 node, address addr) virtual public;
	function addr(bytes32 node) virtual public view returns (address);
}
