import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  AddFeeSnapshot,
  ClaimFees,
  CreateLaunch,
  ExitLaunch,
  JoinLaunch,
  LaunchDone,
  OwnershipTransferred,
  UpdateCreateLaunchFee,
  UpdateFeeToDevAddress,
  UpdateHooks,
  UpdateILiquidityManager,
  UpdateLPLaunchState,
  UpdateLowFee,
  WithdrawLiquidity
} from "../generated/LPLaunch/LPLaunch"

export function createAddFeeSnapshotEvent(
  fundTotalAmount: BigInt,
  token0: BigInt,
  token1: BigInt,
  user: Address
): AddFeeSnapshot {
  let addFeeSnapshotEvent = changetype<AddFeeSnapshot>(newMockEvent())

  addFeeSnapshotEvent.parameters = new Array()

  addFeeSnapshotEvent.parameters.push(
    new ethereum.EventParam(
      "fundTotalAmount",
      ethereum.Value.fromUnsignedBigInt(fundTotalAmount)
    )
  )
  addFeeSnapshotEvent.parameters.push(
    new ethereum.EventParam("token0", ethereum.Value.fromUnsignedBigInt(token0))
  )
  addFeeSnapshotEvent.parameters.push(
    new ethereum.EventParam("token1", ethereum.Value.fromUnsignedBigInt(token1))
  )
  addFeeSnapshotEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )

  return addFeeSnapshotEvent
}

export function createClaimFeesEvent(
  account: Address,
  token0: BigInt,
  token1: BigInt,
  launchId: BigInt,
  launchToken: Address
): ClaimFees {
  let claimFeesEvent = changetype<ClaimFees>(newMockEvent())

  claimFeesEvent.parameters = new Array()

  claimFeesEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  claimFeesEvent.parameters.push(
    new ethereum.EventParam("token0", ethereum.Value.fromUnsignedBigInt(token0))
  )
  claimFeesEvent.parameters.push(
    new ethereum.EventParam("token1", ethereum.Value.fromUnsignedBigInt(token1))
  )
  claimFeesEvent.parameters.push(
    new ethereum.EventParam(
      "launchId",
      ethereum.Value.fromUnsignedBigInt(launchId)
    )
  )
  claimFeesEvent.parameters.push(
    new ethereum.EventParam(
      "launchToken",
      ethereum.Value.fromAddress(launchToken)
    )
  )

  return claimFeesEvent
}

export function createCreateLaunchEvent(
  _launchId: BigInt,
  creator: Address
): CreateLaunch {
  let createLaunchEvent = changetype<CreateLaunch>(newMockEvent())

  createLaunchEvent.parameters = new Array()

  createLaunchEvent.parameters.push(
    new ethereum.EventParam(
      "_launchId",
      ethereum.Value.fromUnsignedBigInt(_launchId)
    )
  )
  createLaunchEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )

  return createLaunchEvent
}

export function createExitLaunchEvent(
  _launchId: BigInt,
  account: Address,
  amount: BigInt
): ExitLaunch {
  let exitLaunchEvent = changetype<ExitLaunch>(newMockEvent())

  exitLaunchEvent.parameters = new Array()

  exitLaunchEvent.parameters.push(
    new ethereum.EventParam(
      "_launchId",
      ethereum.Value.fromUnsignedBigInt(_launchId)
    )
  )
  exitLaunchEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  exitLaunchEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return exitLaunchEvent
}

export function createJoinLaunchEvent(
  _launchId: BigInt,
  account: Address,
  amount: BigInt
): JoinLaunch {
  let joinLaunchEvent = changetype<JoinLaunch>(newMockEvent())

  joinLaunchEvent.parameters = new Array()

  joinLaunchEvent.parameters.push(
    new ethereum.EventParam(
      "_launchId",
      ethereum.Value.fromUnsignedBigInt(_launchId)
    )
  )
  joinLaunchEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  joinLaunchEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return joinLaunchEvent
}

export function createLaunchDoneEvent(
  foundTotal: BigInt,
  create: Address,
  launchToken: Address
): LaunchDone {
  let launchDoneEvent = changetype<LaunchDone>(newMockEvent())

  launchDoneEvent.parameters = new Array()

  launchDoneEvent.parameters.push(
    new ethereum.EventParam(
      "foundTotal",
      ethereum.Value.fromUnsignedBigInt(foundTotal)
    )
  )
  launchDoneEvent.parameters.push(
    new ethereum.EventParam("create", ethereum.Value.fromAddress(create))
  )
  launchDoneEvent.parameters.push(
    new ethereum.EventParam(
      "launchToken",
      ethereum.Value.fromAddress(launchToken)
    )
  )

  return launchDoneEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createUpdateCreateLaunchFeeEvent(
  _fee: BigInt
): UpdateCreateLaunchFee {
  let updateCreateLaunchFeeEvent = changetype<UpdateCreateLaunchFee>(
    newMockEvent()
  )

  updateCreateLaunchFeeEvent.parameters = new Array()

  updateCreateLaunchFeeEvent.parameters.push(
    new ethereum.EventParam("_fee", ethereum.Value.fromUnsignedBigInt(_fee))
  )

  return updateCreateLaunchFeeEvent
}

export function createUpdateFeeToDevAddressEvent(
  _dev: Address
): UpdateFeeToDevAddress {
  let updateFeeToDevAddressEvent = changetype<UpdateFeeToDevAddress>(
    newMockEvent()
  )

  updateFeeToDevAddressEvent.parameters = new Array()

  updateFeeToDevAddressEvent.parameters.push(
    new ethereum.EventParam("_dev", ethereum.Value.fromAddress(_dev))
  )

  return updateFeeToDevAddressEvent
}

export function createUpdateHooksEvent(hook: Address): UpdateHooks {
  let updateHooksEvent = changetype<UpdateHooks>(newMockEvent())

  updateHooksEvent.parameters = new Array()

  updateHooksEvent.parameters.push(
    new ethereum.EventParam("hook", ethereum.Value.fromAddress(hook))
  )

  return updateHooksEvent
}

export function createUpdateILiquidityManagerEvent(
  _lpManager: Address
): UpdateILiquidityManager {
  let updateILiquidityManagerEvent = changetype<UpdateILiquidityManager>(
    newMockEvent()
  )

  updateILiquidityManagerEvent.parameters = new Array()

  updateILiquidityManagerEvent.parameters.push(
    new ethereum.EventParam(
      "_lpManager",
      ethereum.Value.fromAddress(_lpManager)
    )
  )

  return updateILiquidityManagerEvent
}

export function createUpdateLPLaunchStateEvent(
  _lpLaunchState: Address
): UpdateLPLaunchState {
  let updateLpLaunchStateEvent = changetype<UpdateLPLaunchState>(newMockEvent())

  updateLpLaunchStateEvent.parameters = new Array()

  updateLpLaunchStateEvent.parameters.push(
    new ethereum.EventParam(
      "_lpLaunchState",
      ethereum.Value.fromAddress(_lpLaunchState)
    )
  )

  return updateLpLaunchStateEvent
}

export function createUpdateLowFeeEvent(_lowFee: BigInt): UpdateLowFee {
  let updateLowFeeEvent = changetype<UpdateLowFee>(newMockEvent())

  updateLowFeeEvent.parameters = new Array()

  updateLowFeeEvent.parameters.push(
    new ethereum.EventParam(
      "_lowFee",
      ethereum.Value.fromUnsignedBigInt(_lowFee)
    )
  )

  return updateLowFeeEvent
}

export function createWithdrawLiquidityEvent(
  account: Address,
  token0: BigInt,
  token1: BigInt,
  launchId: BigInt,
  launchToken: Address
): WithdrawLiquidity {
  let withdrawLiquidityEvent = changetype<WithdrawLiquidity>(newMockEvent())

  withdrawLiquidityEvent.parameters = new Array()

  withdrawLiquidityEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  withdrawLiquidityEvent.parameters.push(
    new ethereum.EventParam("token0", ethereum.Value.fromUnsignedBigInt(token0))
  )
  withdrawLiquidityEvent.parameters.push(
    new ethereum.EventParam("token1", ethereum.Value.fromUnsignedBigInt(token1))
  )
  withdrawLiquidityEvent.parameters.push(
    new ethereum.EventParam(
      "launchId",
      ethereum.Value.fromUnsignedBigInt(launchId)
    )
  )
  withdrawLiquidityEvent.parameters.push(
    new ethereum.EventParam(
      "launchToken",
      ethereum.Value.fromAddress(launchToken)
    )
  )

  return withdrawLiquidityEvent
}
