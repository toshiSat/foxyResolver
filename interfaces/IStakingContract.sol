// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.8.9;

interface IStakingContract {
    function timeLeftToRequestWithdrawal() external view returns (uint256);
    function lastTokeCycleIndex() external view returns (uint256);
    function requestWithdrawalAmount() external view returns (uint256);
    function sendWithdrawalRequests() external;
}
