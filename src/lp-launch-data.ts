import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { Register as RegisterEvent, ClaimBonus as ClaimBonusEvent, AddTradingVolumeTotal as TradingVolumeEvent } from "../generated/LPLaunchData/LPLaunchData";
import { User, RegisterRecord, ClaimBonusRecord } from "../generated/schema";

export function handleRegister(event: RegisterEvent): void {
    let userId = event.params.account;
    let user = User.load(userId);

    if (!user) {
        user = new User(userId);
        user.participationCount = BigInt.fromI32(0);
        user.totalParticipationAmount = BigInt.fromI32(0);
        user.totalTradingVolume = BigInt.fromI32(0);
        user.totalFee = BigInt.fromI32(0);
        user.totalClaimedBonus = BigInt.fromI32(0);
    }

    // Update referral information
    user.code = event.params.code;
    user.refAddress = event.params.ref; // Treated as Address (Bytes)
    user.registerTime = event.block.timestamp;

    // Set refCode from referrer's code
    if (event.params.ref.notEqual(Address.zero())) {
        let referrer = User.load(event.params.ref);
        if (referrer) {
            user.refCode = referrer.code;
            // Set second-level referrer (refRefAddress, refRefCode)
            if (referrer.refAddress && !referrer.refAddress!.equals(Address.zero())) {
                user.refRefAddress = referrer.refAddress;
                user.refRefCode = referrer.refCode;
            } else {
                user.refRefAddress = null;
                user.refRefCode = null;
            }
        } else {
            user.refCode = null;
            user.refRefAddress = null;
            user.refRefCode = null;
        }
    } else {
        user.refCode = null;
        user.refRefAddress = null;
        user.refRefCode = null;
    }

    user.save();

    // Create a register record
    let recordId = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
    let record = new RegisterRecord(recordId);
    record.account = event.params.account;
    record.code = event.params.code;
    record.refAddress = event.params.ref;
    record.blockNumber = event.block.number;
    record.blockTimestamp = event.block.timestamp;
    record.transactionHash = event.transaction.hash;
    record.save();
}

export function handleClaimBonus(event: ClaimBonusEvent): void {
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

    // Update claimed bonus and last updated timestamp
    user.totalClaimedBonus = user.totalClaimedBonus.plus(event.params.value);
    user.save();

    // Create a claim bonus record
    let recordId = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
    let record = new ClaimBonusRecord(recordId);
    record.account = event.params.account;
    record.value = event.params.value;
    record.blockNumber = event.block.number;
    record.blockTimestamp = event.block.timestamp;
    record.transactionHash = event.transaction.hash;
    record.save();
}

export function handleTradingVolume(event: TradingVolumeEvent): void {
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

    // Update trading volume and last updated timestamp
    user.totalTradingVolume = user.totalTradingVolume.plus(event.params.value);

    // Calculate fee: 1/1000 of trading volume
    let fee = event.params.value.div(BigInt.fromI32(1000));

    // Allocate fee to referrer (8%)
    if (user.refAddress !== null) {
        let refAddress = user.refAddress as Bytes;
        if (!refAddress.equals(Address.zero())) {
            let referrer = User.load(refAddress);
            if (referrer) {
                let referrerFee = fee.times(BigInt.fromI32(8)).div(BigInt.fromI32(100));
                referrer.totalFee = referrer.totalFee.plus(referrerFee);
                referrer.save();
            }
        }
    }

    // Allocate fee to referrer's referrer (2%)
    if (user.refRefAddress !== null) {
        let refRefAddress = user.refRefAddress as Bytes;
        if (!refRefAddress.equals(Address.zero())) {
            let refReferrer = User.load(refRefAddress);
            if (refReferrer) {
                let refReferrerFee = fee.times(BigInt.fromI32(2)).div(BigInt.fromI32(100));
                refReferrer.totalFee = refReferrer.totalFee.plus(refReferrerFee);
                refReferrer.save();
            }
        }
    }

    user.save();
}