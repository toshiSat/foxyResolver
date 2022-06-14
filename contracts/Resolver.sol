// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity ^0.8.9;

import "../interfaces/ITokeManager.sol";
import "../interfaces/IStakingContract.sol";

contract Resolver {
    address immutable TOKE_MANAGER;
    address immutable STAKING_CONTRACT;

    constructor(address tokeManager, address stakingContract) {
        TOKE_MANAGER = tokeManager;
        STAKING_CONTRACT = stakingContract;
    }

    function checker()
        external
        view
        returns (bool canExec, bytes memory execPayload)
    {
        ITokeManager tokeManager = ITokeManager(TOKE_MANAGER);
        IStakingContract stakingContract = IStakingContract(STAKING_CONTRACT);

        uint256 timeLeftToRequestWithdrawal = stakingContract
            .timeLeftToRequestWithdrawal();
        uint256 lastTokeCycleIndex = stakingContract.lastTokeCycleIndex();
        uint256 requestWithdrawalAmount = stakingContract
            .requestWithdrawalAmount();
        uint256 duration = tokeManager.getCycleDuration();
        uint256 currentCycleStart = tokeManager.getCurrentCycle();
        uint256 currentCycleIndex = tokeManager.getCurrentCycleIndex();
        uint256 nextCycleStart = currentCycleStart + duration;
        uint256 offset = 2; // used to give the contract an opportunity to perform this function itself

        canExec =
            block.timestamp + (timeLeftToRequestWithdrawal / offset) >=
            nextCycleStart &&
            currentCycleIndex > lastTokeCycleIndex &&
            requestWithdrawalAmount > 0;

        execPayload = abi.encodeWithSelector(
            IStakingContract.sendWithdrawalRequests.selector
        );

        return (canExec, execPayload);
    }
}
