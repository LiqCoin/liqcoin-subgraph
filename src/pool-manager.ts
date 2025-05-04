import { LiquidityPool, SwapRecord } from "../generated/schema";
import { Swap } from "../generated/PoolManager/PoolManager";
import { BigInt, Bytes } from "@graphprotocol/graph-ts";

export function handleSwap(event: Swap): void { 
  let poolId = event.params.id;
  let liquidityPool = LiquidityPool.load(poolId);
 // Skip if pool doesn't exist in LiquidityPool
  if (!liquidityPool) {
    return;
  }
 
  let swapRecordId = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
  let swapRecord = new SwapRecord(swapRecordId);

  swapRecord.pool = liquidityPool.id;
  swapRecord.sender = event.params.sender;
  swapRecord.amount0 = event.params.amount0;
  swapRecord.amount1 = event.params.amount1;
  swapRecord.sqrtPriceX96 = event.params.sqrtPriceX96;
  swapRecord.liquidity = event.params.liquidity;
  swapRecord.tick = BigInt.fromI32(event.params.tick);
  swapRecord.fee = BigInt.fromI32(event.params.fee);
  swapRecord.blockNumber = event.block.number;
  swapRecord.blockTimestamp = event.block.timestamp;
  swapRecord.transactionHash = event.transaction.hash;

  swapRecord.save();
}