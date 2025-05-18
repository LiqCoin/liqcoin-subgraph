import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { TradingVolume as TradingVolumeEvent } from "../generated/LPFeeHook/LPFeeHook";
import { User } from "../generated/schema";

export function handleTradingVolume(event: TradingVolumeEvent): void {
    let userId = event.params._account;
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
    user.totalTradingVolume = user.totalTradingVolume.plus(event.params._volume);

    // Calculate fee: 1/1000 of trading volume
    let fee = event.params._volume.div(BigInt.fromI32(1000));

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