import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { Swap } from "../generated/schema"
import { Swap as SwapEvent } from "../generated/PoolManager/PoolManager"
import { handleSwap } from "../src/pool-manager"
import { createSwapEvent } from "./pool-manager-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let id = Bytes.fromI32(1234567890)
    let sender = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amount0 = BigInt.fromI32(234)
    let amount1 = BigInt.fromI32(234)
    let sqrtPriceX96 = BigInt.fromI32(234)
    let liquidity = BigInt.fromI32(234)
    let tick = 123
    let fee = 123
    let newSwapEvent = createSwapEvent(
      id,
      sender,
      amount0,
      amount1,
      sqrtPriceX96,
      liquidity,
      tick,
      fee
    )
    handleSwap(newSwapEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Swap created and stored", () => {
    assert.entityCount("Swap", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Swap",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "sender",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Swap",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount0",
      "234"
    )
    assert.fieldEquals(
      "Swap",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount1",
      "234"
    )
    assert.fieldEquals(
      "Swap",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "sqrtPriceX96",
      "234"
    )
    assert.fieldEquals(
      "Swap",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "liquidity",
      "234"
    )
    assert.fieldEquals(
      "Swap",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tick",
      "123"
    )
    assert.fieldEquals(
      "Swap",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "fee",
      "123"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
