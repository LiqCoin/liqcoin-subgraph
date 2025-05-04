import { AddLiquidity } from '../generated/LiquidityManager/LiquidityManager'
import { LiquidityPool } from '../generated/schema'
import { BigInt, Bytes } from '@graphprotocol/graph-ts'

export function handleAddLiquidity(event: AddLiquidity): void {
  let poolId = event.params.poolId
  let entity = LiquidityPool.load(poolId)

  // Skip if pool already exists
  if (entity != null) {
    return
  }

  entity = new LiquidityPool(poolId)
  entity.token0 = event.params.token0
  entity.token1 = event.params.token1
  entity.liquidityDelta = event.params.liquidityDelta
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}