import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { AddFeeSnapshot } from "../generated/schema"
import { AddFeeSnapshot as AddFeeSnapshotEvent } from "../generated/LPLaunch/LPLaunch"
import { handleAddFeeSnapshot } from "../src/lp-launch"
import { createAddFeeSnapshotEvent } from "./lp-launch-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let fundTotalAmount = BigInt.fromI32(234)
    let token0 = BigInt.fromI32(234)
    let token1 = BigInt.fromI32(234)
    let user = Address.fromString("0x0000000000000000000000000000000000000001")
    let newAddFeeSnapshotEvent = createAddFeeSnapshotEvent(
      fundTotalAmount,
      token0,
      token1,
      user
    )
    handleAddFeeSnapshot(newAddFeeSnapshotEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AddFeeSnapshot created and stored", () => {
    assert.entityCount("AddFeeSnapshot", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AddFeeSnapshot",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "fundTotalAmount",
      "234"
    )
    assert.fieldEquals(
      "AddFeeSnapshot",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "token0",
      "234"
    )
    assert.fieldEquals(
      "AddFeeSnapshot",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "token1",
      "234"
    )
    assert.fieldEquals(
      "AddFeeSnapshot",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "user",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
