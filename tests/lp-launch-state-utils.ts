import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Operator,
  OwnershipTransferred,
  UpdateLPLaunch,
  UpdateLiquidityManager,
  UpdateTokenInfo
} from "../generated/LPLaunchState/LPLaunchState"

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

export function createUpdateLPLaunchEvent(_lpLaunch: Address): UpdateLPLaunch {
  let updateLpLaunchEvent = changetype<UpdateLPLaunch>(newMockEvent())

  updateLpLaunchEvent.parameters = new Array()

  updateLpLaunchEvent.parameters.push(
    new ethereum.EventParam("_lpLaunch", ethereum.Value.fromAddress(_lpLaunch))
  )

  return updateLpLaunchEvent
}

export function createUpdateLiquidityManagerEvent(
  _lpManager: Address
): UpdateLiquidityManager {
  let updateLiquidityManagerEvent = changetype<UpdateLiquidityManager>(
    newMockEvent()
  )

  updateLiquidityManagerEvent.parameters = new Array()

  updateLiquidityManagerEvent.parameters.push(
    new ethereum.EventParam(
      "_lpManager",
      ethereum.Value.fromAddress(_lpManager)
    )
  )

  return updateLiquidityManagerEvent
}

export function createUpdateTokenInfoEvent(
  launchId: BigInt,
  name: Bytes,
  symbol: Bytes
): UpdateTokenInfo {
  let updateTokenInfoEvent = changetype<UpdateTokenInfo>(newMockEvent())

  updateTokenInfoEvent.parameters = new Array()

  updateTokenInfoEvent.parameters.push(
    new ethereum.EventParam(
      "launchId",
      ethereum.Value.fromUnsignedBigInt(launchId)
    )
  )
  updateTokenInfoEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromFixedBytes(name))
  )
  updateTokenInfoEvent.parameters.push(
    new ethereum.EventParam("symbol", ethereum.Value.fromFixedBytes(symbol))
  )

  return updateTokenInfoEvent
}
