import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AddLiquidity,
  Operator,
  OwnershipTransferred,
  RemoveLiquidity,
  UpdatePoolManager,
  UpdatePoolModifyLiquidity
} from "../generated/Contract/Contract"

export function createAddLiquidityEvent(
  token0: Address,
  token1: Address,
  liquidityDelta: BigInt
): AddLiquidity {
  let addLiquidityEvent = changetype<AddLiquidity>(newMockEvent())

  addLiquidityEvent.parameters = new Array()

  addLiquidityEvent.parameters.push(
    new ethereum.EventParam("token0", ethereum.Value.fromAddress(token0))
  )
  addLiquidityEvent.parameters.push(
    new ethereum.EventParam("token1", ethereum.Value.fromAddress(token1))
  )
  addLiquidityEvent.parameters.push(
    new ethereum.EventParam(
      "liquidityDelta",
      ethereum.Value.fromSignedBigInt(liquidityDelta)
    )
  )

  return addLiquidityEvent
}

export function createOperatorEvent(
  account: Address,
  value: boolean
): Operator {
  let operatorEvent = changetype<Operator>(newMockEvent())

  operatorEvent.parameters = new Array()

  operatorEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  operatorEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromBoolean(value))
  )

  return operatorEvent
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

export function createRemoveLiquidityEvent(
  token0: Address,
  token1: Address,
  liquidityDelta: BigInt
): RemoveLiquidity {
  let removeLiquidityEvent = changetype<RemoveLiquidity>(newMockEvent())

  removeLiquidityEvent.parameters = new Array()

  removeLiquidityEvent.parameters.push(
    new ethereum.EventParam("token0", ethereum.Value.fromAddress(token0))
  )
  removeLiquidityEvent.parameters.push(
    new ethereum.EventParam("token1", ethereum.Value.fromAddress(token1))
  )
  removeLiquidityEvent.parameters.push(
    new ethereum.EventParam(
      "liquidityDelta",
      ethereum.Value.fromSignedBigInt(liquidityDelta)
    )
  )

  return removeLiquidityEvent
}

export function createUpdatePoolManagerEvent(
  _poolManager: Address
): UpdatePoolManager {
  let updatePoolManagerEvent = changetype<UpdatePoolManager>(newMockEvent())

  updatePoolManagerEvent.parameters = new Array()

  updatePoolManagerEvent.parameters.push(
    new ethereum.EventParam(
      "_poolManager",
      ethereum.Value.fromAddress(_poolManager)
    )
  )

  return updatePoolManagerEvent
}

export function createUpdatePoolModifyLiquidityEvent(
  _lpRouter: Address
): UpdatePoolModifyLiquidity {
  let updatePoolModifyLiquidityEvent = changetype<UpdatePoolModifyLiquidity>(
    newMockEvent()
  )

  updatePoolModifyLiquidityEvent.parameters = new Array()

  updatePoolModifyLiquidityEvent.parameters.push(
    new ethereum.EventParam("_lpRouter", ethereum.Value.fromAddress(_lpRouter))
  )

  return updatePoolModifyLiquidityEvent
}
