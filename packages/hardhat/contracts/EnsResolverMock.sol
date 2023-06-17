// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './EnsResolver.sol';

/**
 * @title EnsResolverMock
 */
contract EnsResolverMock is EnsResolver {
	mapping(bytes32 => address) public targets;

	function setAddr(bytes32 _node, address _addr) virtual public override {
		targets[_node] = _addr;
	}

	function addr(bytes32 _node) virtual public view override returns (address) {
		return targets[_node];
	}
}
