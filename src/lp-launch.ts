import { Bytes, BigInt, ByteArray } from "@graphprotocol/graph-ts";
import {
  CreateLaunch as CreateLaunchEvent,
  Invest as InvestEvent,
  Divest as DivestEvent,
  LaunchDone as LaunchDoneEvent,
  ClaimFees as ClaimFeesEvent,
  RemoveLiquidity as RemoveLiquidityEvent,
} from "../generated/LPLaunch/LPLaunch";
import { ClaimFeesRecord, Launch, Participant, RemoveLiquidityRecord, TokenInfo, User } from "../generated/schema";

export function handleCreateLaunch(event: CreateLaunchEvent): void {
  let launchId = event.params._launchId.toHexString();
  let entity = new Launch(launchId);
  entity.launchId = event.params._launchId;
  entity.targetAmount = event.params._targetAmount;
  entity.fundTotal = BigInt.fromI32(0);
  entity.accountTotal = BigInt.fromI32(0);
  entity.poolLockTime = event.params._poolLockDays;
  entity.devLpRatio = event.params._devLpRatio;
  entity.creator = event.params.creator;
  entity.poolFee = BigInt.fromI32(event.params._poolFee);
  entity.poolInitialTick = BigInt.fromI32(event.params._initialTick);
  entity.poolId = Bytes.fromHexString("0x0000000000000000000000000000000000000000000000000000000000000000");
  entity.hooks = Bytes.fromHexString("0x0000000000000000000000000000000000000000");
  entity.liquidityDelta = BigInt.fromI32(0);
  entity.launchToken = Bytes.fromHexString("0x0000000000000000000000000000000000000000");
  entity.createTime = event.block.timestamp;
  entity.updateTime = event.block.timestamp;
  entity.launchDone = false;
  entity.launchDoneTime = BigInt.fromI32(0);
  entity.claimedToken0 = BigInt.fromI32(0);
  entity.claimedToken1 = BigInt.fromI32(0);
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();

  // let tokenInfo = TokenInfo.load(launchId);
  // if (tokenInfo != null) {
  //   entity.tokenInfo = tokenInfo.id;
  // }
}

export function handleInvest(event: InvestEvent): void {
  let launchId = event.params._launchId.toHexString();;
  let launch = Launch.load(launchId);
  if (!launch) return;

  launch.fundTotal = launch.fundTotal.plus(event.params.amount);

  let participantId = event.params.account.toHexString() + "-" + launchId;
  let participant = Participant.load(participantId);

  if (!participant) {
    participant = new Participant(participantId);
    participant.launch = launchId;
    participant.account = event.params.account;
    participant.totalInvested = BigInt.fromI32(0);
    participant.claimedToken0 = BigInt.fromI32(0);
    participant.claimedToken1 = BigInt.fromI32(0);
    participant.lastClaimTime = BigInt.fromI32(0);
    launch.accountTotal = launch.accountTotal.plus(BigInt.fromI32(1));
  }
  participant.isWithdrawn = false;
  participant.isRemoveLP = false;
  participant.totalInvested = participant.totalInvested.plus(event.params.amount);
  participant.blockNumber = event.block.number;
  participant.blockTimestamp = event.block.timestamp;
  participant.transactionHash = event.transaction.hash;
  participant.createTime = event.block.timestamp;
  participant.save();

  let userId = event.params.account;
  let user = User.load(userId);
  if (!user) {
    user = new User(userId);
    user.participationCount = BigInt.fromI32(0);
    user.totalParticipationAmount = BigInt.fromI32(0);
    user.totalTradingVolume = BigInt.fromI32(0);
    user.totalFee = BigInt.fromI32(0);
    user.totalClaimedBonus = BigInt.fromI32(0);
    user.registerTime = event.block.timestamp;
  }
  user.participationCount = user.participationCount.plus(BigInt.fromI32(1));
  user.totalParticipationAmount = user.totalParticipationAmount.plus(event.params.amount);
  user.save();

  launch.updateTime = event.block.timestamp;
  launch.save();
}

export function handleDivest(event: DivestEvent): void {
  let launchId = event.params._launchId.toHexString();
  let launch = Launch.load(launchId);
  if (!launch) return;

  let participantId = event.params.account.toHexString() + "-" + launchId;
  let participant = Participant.load(participantId);
  if (!participant) return;

  launch.fundTotal = launch.fundTotal.minus(event.params.amount);
  launch.accountTotal = launch.accountTotal.minus(BigInt.fromI32(1));

  participant.totalInvested = BigInt.fromI32(0);
  participant.isWithdrawn = true;
  participant.blockNumber = event.block.number;
  participant.blockTimestamp = event.block.timestamp;
  participant.transactionHash = event.transaction.hash;
  participant.save();

  let userId = event.params.account;
  let user = User.load(userId);
  if (user) {
    if (!launch.launchDone && user.participationCount.gt(BigInt.fromI32(0))) {
      user.participationCount = user.participationCount.minus(BigInt.fromI32(1));
    }
    if (user.totalParticipationAmount.ge(event.params.amount)) {
      user.totalParticipationAmount = user.totalParticipationAmount.minus(event.params.amount);
    } else {
      user.totalParticipationAmount = BigInt.fromI32(0);
    }
    user.save();
  }

  launch.updateTime = event.block.timestamp;
  launch.save();
}

export function handleLaunchDone(event: LaunchDoneEvent): void {
  let launchId = event.params._launchId.toHexString();
  let launch = Launch.load(launchId);
  if (!launch) return;

  launch.fundTotal = event.params.foundTotal;
  launch.poolId = event.params.poolId;
  launch.launchToken = event.params.launchToken;
  launch.launchDone = true;
  launch.launchDoneTime = event.block.timestamp;
  launch.blockNumber = event.block.number;
  launch.blockTimestamp = event.block.timestamp;
  launch.transactionHash = event.transaction.hash;
  launch.updateTime = event.block.timestamp;
  launch.save();
}

export function handleClaimFees(event: ClaimFeesEvent): void {
  let launchId = event.params.launchId.toHexString();
  let participantId = event.params.account.toHexString() + "-" + launchId;

  let launch = Launch.load(launchId);
  if (!launch) return;

  launch.claimedToken0 = launch.claimedToken0.plus(event.params.token0);
  launch.claimedToken1 = launch.claimedToken1.plus(event.params.token1);
  launch.save();

  let participant = Participant.load(participantId);
  if (!participant) {
    participant = new Participant(participantId);
    participant.launch = launchId;
    participant.account = event.params.account;
    participant.totalInvested = BigInt.fromI32(0);
    participant.claimedToken0 = BigInt.fromI32(0);
    participant.claimedToken1 = BigInt.fromI32(0);
    participant.lastClaimTime = BigInt.fromI32(0);
    participant.createTime = event.block.timestamp;
    participant.isWithdrawn = false;
    participant.isRemoveLP = false;
  }

  if (event.params.token0.lt(BigInt.fromI32(0)) || event.params.token1.lt(BigInt.fromI32(0))) {
    return;
  }

  participant.claimedToken0 = participant.claimedToken0.plus(event.params.token0);
  participant.claimedToken1 = participant.claimedToken1.plus(event.params.token1);

  participant.lastClaimTime = event.block.timestamp;
  participant.blockNumber = event.block.number;
  participant.blockTimestamp = event.block.timestamp;
  participant.transactionHash = event.transaction.hash;

  participant.save();

  let recordId = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
  let record = new ClaimFeesRecord(recordId);
  record.account = event.params.account;
  record.launchId = event.params.launchId;
  record.token0 = event.params.token0;
  record.token1 = event.params.token1;
  record.blockNumber = event.block.number;
  record.blockTimestamp = event.block.timestamp;
  record.transactionHash = event.transaction.hash;
  record.save();
}

export function handleRemoveLiquidity(event: RemoveLiquidityEvent): void {
  let launchId = event.params.launchId.toHexString();
  let participantId = event.params.account.toHexString() + "-" + launchId;
  let launch = Launch.load(launchId);
  if (!launch) return;
  // if (
  //   event.params.lpToken0.lt(BigInt.fromI32(0)) ||
  //   event.params.lpToken1.lt(BigInt.fromI32(0)) ||
  //   event.params.feeToken0.lt(BigInt.fromI32(0)) ||
  //   event.params.feeToken1.lt(BigInt.fromI32(0))
  // ) {
  //   return;
  // } 

  launch.claimedToken0 = launch.claimedToken0.plus(event.params.feeToken0);
  launch.claimedToken1 = launch.claimedToken1.plus(event.params.feeToken1);
  launch.save();

  let participant = Participant.load(participantId);
  if (!participant) {
    participant = new Participant(participantId);
    participant.launch = launchId;
    participant.account = event.params.account;
    participant.totalInvested = BigInt.fromI32(0);
    participant.claimedToken0 = BigInt.fromI32(0);
    participant.claimedToken1 = BigInt.fromI32(0);
    participant.lastClaimTime = BigInt.fromI32(0);
    participant.createTime = event.block.timestamp;
    participant.isWithdrawn = false;
    participant.isRemoveLP = true;
  } else {
    participant.isRemoveLP = true;
  }

  participant.claimedToken0 = participant.claimedToken0.plus(event.params.feeToken0);
  participant.claimedToken1 = participant.claimedToken1.plus(event.params.feeToken1);

  participant.blockNumber = event.block.number;
  participant.blockTimestamp = event.block.timestamp;
  participant.transactionHash = event.transaction.hash;
  participant.save();

  let recordId = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
  let record = new RemoveLiquidityRecord(recordId);
  record.account = event.params.account;
  record.lpToken0 = event.params.lpToken0;
  record.lpToken1 = event.params.lpToken1;
  record.feeToken0 = event.params.feeToken0;
  record.feeToken1 = event.params.feeToken1;
  record.launchId = event.params.launchId;
  record.launchToken = event.params.launchToken;
  record.blockNumber = event.block.number;
  record.blockTimestamp = event.block.timestamp;
  record.transactionHash = event.transaction.hash;
  record.launch = launchId;

  record.save();

}