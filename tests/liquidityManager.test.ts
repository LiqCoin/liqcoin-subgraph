import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AddLiquidity } from "../generated/schema"
import { AddLiquidity as AddLiquidityEvent } from "../generated/Contract/Contract"
import { handleAddLiquidity } from "../src/liquidity-manager"
import { createAddLiquidityEvent } from "./liquidityManager-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let token0 = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let token1 = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let liquidityDelta = BigInt.fromI32(234)
    let newAddLiquidityEvent = createAddLiquidityEvent(
      token0,
      token1,
      liquidityDelta
    )
    handleAddLiquidity(newAddLiquidityEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AddLiquidity created and stored", () => {
    assert.entityCount("AddLiquidity", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AddLiquidity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "token0",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AddLiquidity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "token1",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AddLiquidity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "liquidityDelta",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
